import twilio from 'twilio';

export async function POST() {
	console.log('POST /api/goals/+server.ts');
	let voiceResponse = new twilio.twiml.VoiceResponse();
	let responder = voiceResponse.say('Hello world!');

	const options: ResponseInit = {
		headers: {
			'content-type': 'text/xml'
		}
	};
	return new Response(responder.toString(), options);
}
