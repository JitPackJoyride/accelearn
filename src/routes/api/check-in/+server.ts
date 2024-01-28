// Makes an outbound phone call to check in with the learner's progress
import { env } from '$env/dynamic/private';
import twilio from 'twilio';

export async function POST() {
	const accountSid = env['TWILIO_ACCOUNT_SID'];
	const authToken = env['TWILIO_AUTH_TOKEN'];
	const client = twilio(accountSid, authToken);

	const call = await client.calls.create({
		url: 'https://demo.twilio.com/docs/voice.xml',
		to: '+447896767601',
		from: '+447700169965'
	});
	return call;
}
