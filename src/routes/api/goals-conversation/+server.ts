import { callStateMachine } from '$lib/service/call/stateMachine.js';
import { isNull } from 'is-what';
import twilio from 'twilio';
import { createActor } from 'xstate';

export async function POST(event) {
	// Start the state machine with the persisted state
	const urlState = event.url.searchParams.get('state');
	const persistedState = isNull(urlState) ? undefined : JSON.parse(urlState);
	const actor = createActor(callStateMachine, persistedState ? { snapshot: persistedState } : {});
	actor.start();

	const responder = new twilio.twiml.VoiceResponse();

	const currentState = actor.getSnapshot();
	const formData = await event.request.formData();
	const twilioData = Object.fromEntries(formData);
	switch (currentState.value) {
		case 'concept':
			actor.send({ type: 'concept.ok', concept: twilioData['SpeechResult']?.toString() ?? '' });
			responder.say("What is your current level for the concept you're working on?");
			responder.gather({
				action: `/api/goals-conversation?state=${JSON.stringify(actor.getPersistedSnapshot())}`
			});
			break;
		case 'currentLevel':
			actor.send({
				type: 'currentLevel.ok',
				currentLevel: twilioData['SpeechResult']?.toString() ?? ''
			});
			responder.say("What is your target level for the concept you're working on?");
			responder.gather({
				action: `/api/goals-conversation?state=${JSON.stringify(actor.getPersistedSnapshot())}`
			});
			break;
		case 'targetLevel':
			actor.send({
				type: 'targetLevel.ok',
				targetLevel: twilioData['SpeechResult']?.toString() ?? ''
			});
			responder.say('When do you want to reach your target level?');
			responder.gather({
				action: `/api/goals-conversation?state=${JSON.stringify(actor.getPersistedSnapshot())}`
			});
			break;
		case 'endDate':
			// const endDate = twilioData['SpeechResult']?.toString() ?? '';
			// const isRealistic = await aiRealistic({
			// 	skill: currentState.context.concept,
			// 	current_capability: currentState.context.currentLevel,
			// 	target_capability: currentState.context.targetLevel,
			// 	start_date: new Date().toISOString(),
			// 	end_date: new Date().toISOString(),
			// })
			// if (isRealistic?.is_realistic) {
			// 	actor.send({ type: 'endDate.realistic', endDate: twilioData['SpeechResult']?.toString() ?? '' });

			// } else {
			// 	actor.send({ type: 'endDate.unrealistic', endDate: twilioData['SpeechResult']?.toString() ?? '', estimatedEndDate: isRealistic?.estimated_date ?? '' });
			// 	responder.say(`That's not realistic, you'll need to extend your end date to ${isRealistic?.estimated_date}`);
			// 	responder.gather({
			// 		action: `/api/goals-conversation?state=${JSON.stringify(actor.getPersistedSnapshot())}`
			// 	});
			// }
			break;
		case 'acceptEstimatedDate':
			break;
		case 'create':
			break;
		case 'close':
			break;
		default:
			break;
	}

	console.log('twilioData', twilioData);
	responder.say(`Gracias amigo, speak to you tomorrow`);
	return new Response(responder.toString(), {
		headers: {
			'content-type': 'text/xml'
		}
	});
}
