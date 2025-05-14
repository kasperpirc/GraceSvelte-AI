import db from '$lib/db';
import { json } from '@sveltejs/kit';

import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export async function POST({ request }) {
	const prompt = await request.text();

	if (typeof prompt !== 'string') {
		throw new Error('Prompt is required');
	}
}
