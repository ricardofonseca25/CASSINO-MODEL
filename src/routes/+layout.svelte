<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	
	export let data;
	
	let showLogoutModal = false;
	
	function logout() {
		document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		goto('/');
	}
</script>

<nav style="background: linear-gradient(90deg, #0f3460 0%, #1a1a2e 100%); padding: 1rem;">
	<div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
		<h1 style="margin: 0; color: #e94560; font-size: 1.8rem;">
			🎰 Cassino Test - SLOTS_TESTs
		</h1>
		
		{#if data.loggedIn}
			<div style="display: flex; align-items: center; gap: 2rem;">
				<div style="background: rgba(255,255,255,0.1); padding: 0.5rem 1rem; border-radius: 20px;">
					<span style="color: #4ecca3;">💰 {data.user.balance} pesos</span>
				</div>
				<div style="background: rgba(255,255,255,0.1); padding: 0.5rem 1rem; border-radius: 20px;">
					👤 {data.user.username}
				</div>
				<button 
					on:click={() => showLogoutModal = true}
					style="background: #e94560; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;"
				>
					Sair
				</button>
			</div>
		{/if}
	</div>
</nav>

<main style="max-width: 1200px; margin: 2rem auto; padding: 0 1rem;">
	<slot />
</main>

{#if showLogoutModal}
	<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
		<div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; text-align: center;">
			<h2 style="color: #e94560; margin-top: 0;">Confirmar Saída</h2>
			<p>Tem certeza que deseja sair?</p>
			<div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
				<button 
					on:click={() => showLogoutModal = false}
					style="background: #4ecca3; color: white; border: none; padding: 0.5rem 2rem; border-radius: 5px; cursor: pointer;"
				>
					Cancelar
				</button>
				<button 
					on:click={logout}
					style="background: #e94560; color: white; border: none; padding: 0.5rem 2rem; border-radius: 5px; cursor: pointer;"
				>
					Sair
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	button:hover {
		opacity: 0.9;
		transform: translateY(-2px);
		transition: all 0.3s ease;
	}
</style>