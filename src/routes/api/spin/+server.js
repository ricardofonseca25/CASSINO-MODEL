import { json } from '@sveltejs/kit';
import { userStore } from '$lib/store.js';

export async function POST({ request, cookies }) {
	const sessionId = cookies.get('session');
	const session = sessionId ? userStore.getSession(sessionId) : null;
	
	if (!session) {
		return json({ success: false, error: 'Não autenticado' });
	}
	
	const { betAmount } = await request.json();
	
	if (!betAmount || betAmount <= 0) {
		return json({ success: false, error: 'Valor da aposta inválido' });
	}
	
	const result = userStore.placeBet(session.username, betAmount);
	
	return json(result);
}