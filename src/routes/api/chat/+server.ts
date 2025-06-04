import db from '$lib/db';
import { json } from '@sveltejs/kit';

import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export async function POST({ request }) {
	const data = await request.json();

	let chat;
	let chatId = data.chatId;
	const message = data.message;

	if (chatId === null) {
		chat = await db.chat.create({
			data: {
				title: 'New Chat',
				messages: {}
			}
		});
		chatId = chat.id;
	}
	chat = await db.chat.update({
		where: { id: chatId },
		data: {
			messages: {
				create: {
					content: message,
					userType: 'human'
				}
			}
		}
	});
	const aiResponse = 'Tvoje sporčilo je:' + message;

	await db.message.create({
		data: {
			chatId: chatId,
			content: aiResponse,
			userType: 'assistant'
		}
	});
	return json({
		response: aiResponse,
		chatId: chatId
	});
}
