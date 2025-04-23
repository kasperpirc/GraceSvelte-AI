import { joke_message } from '$lib/ai';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const message = await request.text();

	const joke = await joke_message.invoke({ topic: message });

	return json({ message: joke });
}
