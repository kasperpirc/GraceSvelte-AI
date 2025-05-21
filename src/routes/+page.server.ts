import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
	const chats = await prisma.chat.findMany({
		include: {
			messages: {
				orderBy: {
					createdAt: 'asc'
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return {
		chats
	};
};
