import { json } from '@sveltejs/kit';
import { userStore } from '$lib/store.js';

export async function POST({ request, cookies }) {
	const { username, password } = await request.json();
	
	// Validar entrada
	if (!username || username.length < 3) {
		return json({ success: false, error: 'Usuário deve ter pelo menos 3 caracteres' });
	}
	
	if (!password || password.length < 4) {
		return json({ success: false, error: 'Senha deve ter pelo menos 4 caracteres' });
	}
	
	const registerResult = userStore.register(username, password);
	
	if (registerResult.success) {
		// Autenticar automaticamente após o registro
		const authResult = userStore.authenticate(username, password);
		
		if (authResult.success) {
			cookies.set('session', authResult.sessionId, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24
			});
			
			return json({ success: true, user: authResult.user });
		}
	}
	
	return json(registerResult);
}