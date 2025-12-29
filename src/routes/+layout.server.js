import { userStore } from '$lib/store.js';

export function load({ cookies }) {
	const sessionId = cookies.get('session');
	const session = sessionId ? userStore.getSession(sessionId) : null;
	
	if (session) {
		const user = userStore.getUser(session.username);
		return {
			user: {
				username: user.username,
				balance: user.balance
			},
			loggedIn: true
		};
	}
	
	return { user: null, loggedIn: false };
}