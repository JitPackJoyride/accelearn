import twilio from 'twilio';

export async function POST(event) {
	console.log(JSON.stringify(event));
	console.log(event.request);

	const formData = await event.request.formData();
	let twilioData = Object.fromEntries(formData);
	console.log('twilioData', twilioData);

	let responder = new twilio.twiml.VoiceResponse();
	responder.say(`Gracias amigo, speak to you tomorrow`);
	return new Response(responder.toString(), {
		headers: {
			'content-type': 'text/xml'
		}
	});
}
