import { json } from '@sveltejs/kit';
import { userStore } from '$lib/store.js';

export async function POST({ cookies }) {
	const sessionId = cookies.get('session');
	
	if (sessionId) {
		userStore.logout(sessionId);
		cookies.delete('session', { path: '/' });
	}
	
	return json({ success: true });
}