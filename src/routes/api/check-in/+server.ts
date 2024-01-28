// Makes an outbound phone call to check in with the learner's progress
import { env } from '$env/dynamic/private';
import twilio from 'twilio';
import { json } from '@sveltejs/kit';

// TODO get the learner's latest skill
// TODO get the first sub-skill

export async function POST() {
	const accountSid = env['TWILIO_ACCOUNT_SID'];
	const authToken = env['TWILIO_AUTH_TOKEN'];
	const client = twilio(accountSid, authToken);
	const voiceResponse = new twilio.twiml.VoiceResponse();
	voiceResponse.say(
		'Hey cowboy, this is your daily check in. How are you getting on with your phonics?'
	);
	voiceResponse.record({
		transcribe: true,
		maxLength: 30,
		action: '/api/check-in/recorded'
	});

	const call = await client.calls.create({
		twiml: voiceResponse.toString(),
		to: '+447896767601',
		from: '+447700169965'
	});
	return json(call);
}
