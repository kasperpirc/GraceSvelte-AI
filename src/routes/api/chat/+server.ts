import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	let chat;
	let chatId = data.chatId;
	const message = data.message;

	if (chatId === null) {
		// Create a new empty chat
		chat = await prisma.chat.create({
			data: {
				title: 'New Chat',
				messages: {}
			}
		});
		chatId = chat.id;
	}

	// Add message to existing chat
	chat = await prisma.chat.update({
		where: { id: chatId },
		data: {
			messages: {
				create: {
					content: message,
					role: 'user'
				}
			}
		}
	});

	// If there's a message, process it and create an AI response
	if (message) {
		// Here you would typically integrate with an AI service
		// For now, we'll just echo back a simple response
		const aiResponse = `I received your message: "${message}"`;

		// Save the AI response
		await prisma.message.create({
			data: {
				content: aiResponse,
				role: 'assistant',
				chatId: chat.id
			}
		});

		return json({
			response: aiResponse,
			chatId: chat.id
		});
	}

	return json({
		chatId: chat.id
	});
};
