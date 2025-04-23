import { image_message } from '$lib/ai';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const image = await request.text();

	const description = await image_message.invoke({ image_url: image });

	return json({ message: description });
}
