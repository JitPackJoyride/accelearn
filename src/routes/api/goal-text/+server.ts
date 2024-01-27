import twilio from 'twilio';

export async function POST(event) {
	console.log(JSON.stringify(event));
	console.log(event.request.formData);

	const formData = await event.request.formData();
	Object.entries(formData).forEach(([key, value]) => {
		console.log('formData key', key);
		console.log('formData value', value);
	});

	let responder = new twilio.twiml.VoiceResponse();
	responder.say(`Gracias amigo, speak to you tomorrow`);
	return new Response(responder.toString(), {
		headers: {
			'content-type': 'text/xml'
		}
	});
}
