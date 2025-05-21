import db from '$lib/db';

export const load = async () => {
	const chats = await db.chat.findMany({
		include: {
			messages: true
		}
	});

	return {
		chats
	};
};
