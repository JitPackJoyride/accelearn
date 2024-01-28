import { aiAxiosInstance } from '$lib/service/ai/axios.js';
import { aiRealistic } from '$lib/service/ai/realistic';
import { callStateMachine } from '$lib/service/call/stateMachine.js';
import { parseAbsoluteToLocal, toCalendarDate } from '@internationalized/date';
import { json } from '@sveltejs/kit';
import { isNull, isNullOrUndefined } from 'is-what';
import twilio from 'twilio';
import { createActor } from 'xstate';

export async function POST(event) {
	// Start the state machine with the persisted state
	console.log('📒 url', event.url);

	const urlState = event.url.searchParams.get('state');
	const persistedState = isNull(urlState) ? undefined : JSON.parse(decodeURIComponent(urlState));
	console.log('persistedState', persistedState);
	const actor = createActor(callStateMachine, persistedState ? { snapshot: persistedState } : {});
	actor.start();

	const responder = new twilio.twiml.VoiceResponse();

	const currentState = actor.getSnapshot();
	const formData = await event.request.formData();
	const twilioData = Object.fromEntries(formData);
	console.log('twilioData', twilioData);
	switch (currentState.value) {
		case 'skill':
			actor.send({ type: 'skill.ok', skill: twilioData['SpeechResult']?.toString() ?? '' });
			responder.say("What is your current level for the skill you're working on?");
			responder.gather({
				action: `/api/goals-conversation?state=${encodeURIComponent(JSON.stringify(actor.getPersistedSnapshot()))}`,
				input: ['speech'],
				speechTimeout: 'auto'
			});
			console.log('skill context', currentState.context);
			break;
		case 'currentLevel':
			actor.send({
				type: 'currentLevel.ok',
				currentLevel: twilioData['SpeechResult']?.toString() ?? ''
			});
			responder.say("What is your target level for the skill you're working on?");
			responder.gather({
				action: `/api/goals-conversation?state=${encodeURIComponent(JSON.stringify(actor.getPersistedSnapshot()))}`,
				input: ['speech'],
				speechTimeout: 'auto'
			});
			console.log('currentLevel context', currentState.context);
			break;
		case 'targetLevel':
			actor.send({
				type: 'targetLevel.ok',
				targetLevel: twilioData['SpeechResult']?.toString() ?? ''
			});
			responder.say(
				'When do you want to reach your target level? Note that this may take some time to process.'
			);
			responder.gather({
				action: `/api/goals-conversation?state=${encodeURIComponent(JSON.stringify(actor.getPersistedSnapshot()))}`,
				input: ['speech'],
				speechTimeout: 'auto'
			});
			aiAxiosInstance.get('/ping');
			console.log('targetLevel context', currentState.context);
			break;
		case 'endDate': {
			const endDate = twilioData['SpeechResult']?.toString() ?? '';

			const isRealistic = await aiRealistic({
				skill: currentState.context.skill!,
				current_capability: currentState.context.currentLevel!,
				target_capability: currentState.context.targetLevel!,
				start_date: new Date().toISOString(),
				end_date: endDate
			});
			console.log('isRealistic', isRealistic);
			if (isNullOrUndefined(isRealistic)) {
				return json({ success: false });
			}
			if (isRealistic.is_realistic) {
				actor.send({
					type: 'endDate.realistic',
					endDate: isRealistic.estimated_date ?? ''
				});
				responder.say(
					`Your goal can be achieved by ${isRealistic.estimated_date}. Would you like to save this goal? Say yes if you want to save, otherwise say no.`
				);
				responder.gather({
					action: `/api/goals-conversation?state=${encodeURIComponent(JSON.stringify(actor.getPersistedSnapshot()))}`,
					input: ['speech']
				});
			} else {
				actor.send({
					type: 'endDate.unrealistic',
					endDate: twilioData['SpeechResult']?.toString() ?? '',
					estimatedEndDate: isRealistic.estimated_date ?? ''
				});
				responder.say(
					`That's not realistic, you'll need to extend your end date to ${toCalendarDate(parseAbsoluteToLocal(isRealistic?.estimated_date)).toString()}. The reason is because ${isRealistic.reasoning}. Say yes if you want to use the new estimated date, otherwise say no.`
				);
				responder.gather({
					action: `/api/goals-conversation?state=${encodeURIComponent(JSON.stringify(actor.getPersistedSnapshot()))}`,
					input: ['speech']
				});
			}
			break;
		}
		case 'acceptEstimatedDate':
			console.log('currentState.context ', currentState.context!);
			console.log('twilioData', twilioData);
			if (twilioData['SpeechResult']?.toString().includes('yes')) {
				actor.send({
					type: 'estimatedDate.accepted',
					endDate: currentState.context.estimatedEndDate!
				});
				responder.say(
					'Your goal will be targeted to finish by our estimated date. Do you want to save this goal? Say yes if you want to save, otherwise say no.'
				);
				responder.gather({
					action: `/api/goals-conversation?state=${encodeURIComponent(JSON.stringify(actor.getPersistedSnapshot()))}`,
					input: ['speech']
				});
			} else {
				actor.send({
					type: 'estimatedDate.rejected'
				});
				responder.say(
					'Your goal will be targeted to finish by the date you specified. Do you want to save this goal? Say yes if you want to save, otherwise say no.'
				);
				responder.gather({
					action: `/api/goals-conversation?state=${encodeURIComponent(JSON.stringify(actor.getPersistedSnapshot()))}`,
					input: ['speech']
				});
			}
			break;
		case 'create':
			console.log('currentState.context ', currentState.context!);
			console.log('twilioData', twilioData);
			if (twilioData['SpeechResult']?.toString().includes('yes')) {
				actor.send({
					type: 'create.confirm',
					phone: twilioData['Caller']?.toString() ?? ''
				});
				responder.say('Your goal has been saved.');
			} else {
				actor.send({
					type: 'create.rejected'
				});
				responder.say(
					'Your goal has been rejected. Please make a new goal. Tell me what you want to learn?'
				);
				responder.gather({
					action: `/api/goals-conversation?state=${encodeURIComponent(JSON.stringify(actor.getPersistedSnapshot()))}`,
					input: ['speech'],
					speechTimeout: 'auto'
				});
				actor.stop();
			}
			break;
		default:
			break;
	}

	console.log('twilioData', twilioData);
	console.log('currentState context', currentState.context);
	return new Response(responder.toString(), {
		headers: {
			'content-type': 'text/xml'
		}
	});
}
