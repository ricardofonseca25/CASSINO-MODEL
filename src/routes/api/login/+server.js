import { json } from '@sveltejs/kit';
import { userStore } from '$lib/store.js';

export async function POST({ request, cookies }) {
	const { username, password } = await request.json();
	
	const result = userStore.authenticate(username, password);
	
	if (result.success) {
		// Definir cookie de sessão
		cookies.set('session', result.sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 24 horas
		});
		
		return json({ success: true, user: result.user });
	}
	
	return json({ success: false, error: result.error });
}