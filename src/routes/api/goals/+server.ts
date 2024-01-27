import twilio from 'twilio';

export async function POST() {
	console.log('POST /api/goals/+server.ts');
	let responder = new twilio.twiml.VoiceResponse();
	responder.say(`Tell me what you'd like to learn, when by and what your current level is`);
	responder.gather({ action: '/api/goal-text', input: ['speech'] });

	const options: ResponseInit = {
		headers: {
			'content-type': 'text/xml'
		}
	};
	return new Response(responder.toString(), options);
}

// import twilio from 'twilio';
// const twiml = twilio.twiml;

// export async function POST({ request }) {
// 	const formData = await request.formData();
// 	const speechResult = formData.get('SpeechResult');
// 	const callSid = formData.get('CallSid'); // Unique identifier for the call
// 	const conversationState = formData.get('ConversationState') || 'askSkill';

// 	const voiceResponse = new twiml.VoiceResponse();

// 	switch (conversationState) {
// 		case 'askSkill':
// 			const gatherSkill = voiceResponse.gather({
// 				input: 'speech',
// 				action: `https://d7b7-79-173-189-36.ngrok-free.app/api/goals?ConversationState=askCurrentCapability`,
// 				method: 'POST',
// 				timeout: 5
// 			});
// 			gatherSkill.say('What skill would you like to improve?');
// 			break;

// 		case 'askCurrentCapability':
// 			// Save 'speechResult' from 'askSkill' somewhere, like a database or session storage
// 			const gatherCurrentCapability = voiceResponse.gather({
// 				input: 'speech',
// 				action: `https://d7b7-79-173-189-36.ngrok-free.app/api/goals?ConversationState=askEndDate`,
// 				method: 'POST',
// 				timeout: 5
// 			});
// 			gatherCurrentCapability.say('What is your current capability?');
// 			break;

// 		case 'askEndDate':
// 			// Continue the conversation by asking for the end date, and so on...
// 			const gatherEndDate = voiceResponse.gather({
// 				input: 'speech',
// 				action: `https://d7b7-79-173-189-36.ngrok-free.app/api/goals?ConversationState=askStartDate`,
// 				method: 'POST',
// 				timeout: 5
// 			});
// 			gatherEndDate.say('What is your target end date for achieving this skill?');
// 			break;

// 		// Add cases for 'askStartDate' and 'askTargetCapability'

// 		default:
// 			voiceResponse.say('Thank you for your responses. Goodbye!');
// 			// Compile all collected data and process it further as needed.
// 			break;
// 	}

// 	const headers = {
// 		'Content-Type': 'text/xml'
// 	};

// 	return new Response(voiceResponse.toString(), { headers });
// }
