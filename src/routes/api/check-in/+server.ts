// Makes an outbound phone call to check in with the learner's progress
import { env } from '$env/dynamic/private';
import twilio from 'twilio';

export async function POST() {
	const accountSid = env['TWILIO_ACCOUNT_SID'];
	const authToken = env['TWILIO_AUTH_TOKEN'];
	const client = twilio(accountSid, authToken);
	twim;

	const call = await client.calls.create({
		twiml:
			"<Response><Say>Hey cowboy, this is your daily check in. How are you getting on? Don't forget to study.</Say></Response>",
		to: '+447896767601',
		from: '+447700169965'
	});
	return call;
}
