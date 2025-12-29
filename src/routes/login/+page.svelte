<script lang="ts">
	import { goto } from '$app/navigation';
	
	let username = '';
	let password = '';
	let confirmPassword = '';
	let isRegistering = false;
	let error = '';
	let isLoading = false;
	
	async function handleSubmit() {
		error = '';
		isLoading = true;
		
		if (isRegistering) {
			if (password !== confirmPassword) {
				error = 'As senhas não coincidem';
				isLoading = false;
				return;
			}
			
			if (password.length < 4) {
				error = 'A senha deve ter pelo menos 4 caracteres';
				isLoading = false;
				return;
			}
		}
		
		try {
			const endpoint = isRegistering ? '/api/register' : '/api/login';
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});
			
			const result = await response.json();
			
			if (result.success) {
				location.reload(); // Recarrega para atualizar a sessão
			} else {
				error = result.error || 'Erro na autenticação';
			}
		} catch (err) {
			error = 'Erro de conexão';
		} finally {
			isLoading = false;
		}
	}
	
	function toggleMode() {
		isRegistering = !isRegistering;
		error = '';
	}
}
</script>

<div style="max-width: 400px; margin: 4rem auto; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
	<h1 style="text-align: center; color: #e94560; margin-top: 0;">
		{#if isRegistering}
			📝 Criar Conta
		{:else}
			🔐 Login
		{/if}
	</h1>
	
	{#if error}
		<div style="background: rgba(233, 69, 96, 0.2); color: #e94560; padding: 0.75rem; border-radius: 5px; margin-bottom: 1rem; text-align: center;">
			{error}
		</div>
	{/if}
	
	<form on:submit|preventDefault={handleSubmit}>
		<div style="margin-bottom: 1rem;">
			<label style="display: block; margin-bottom: 0.5rem; color: #b8b8d1;">Usuário</label>
			<input 
				type="text" 
				bind:value={username}
				required
				style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; color: white; font-size: 1rem; box-sizing: border-box;"
				placeholder="Digite seu usuário"
			/>
		</div>
		
		<div style="margin-bottom: 1rem;">
			<label style="display: block; margin-bottom: 0.5rem; color: #b8b8d1;">Senha</label>
			<input 
				type="password" 
				bind:value={password}
				required
				style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; color: white; font-size: 1rem; box-sizing: border-box;"
				placeholder="Digite sua senha"
			/>
		</div>
		
		{#if isRegistering}
			<div style="margin-bottom: 1.5rem;">
				<label style="display: block; margin-bottom: 0.5rem; color: #b8b8d1;">Confirmar Senha</label>
				<input 
					type="password" 
					bind:value={confirmPassword}
					required
					style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; color: white; font-size: 1rem; box-sizing: border-box;"
					placeholder="Confirme sua senha"
				/>
			</div>
		{/if}
		
		<button 
			type="submit"
			disabled={isLoading}
			style="width: 100%; background: linear-gradient(90deg, #e94560 0%, #ff6b8b 100%); color: white; border: none; padding: 1rem; font-size: 1.1rem; border-radius: 5px; cursor: {isLoading ? 'not-allowed' : 'pointer'}; font-weight: bold; opacity: {isLoading ? 0.7 : 1};"
		>
			{#if isLoading}
				⏳ Processando...
			{:else if isRegistering}
				📝 Criar Conta
			{:else}
				🔐 Entrar
			{/if}
		</button>
	</form>
	
	<div style="text-align: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
		<button 
			on:click={toggleMode}
			style="background: none; border: none; color: #4ecca3; cursor: pointer; text-decoration: underline; font-size: 1rem;"
		>
			{#if isRegistering}
				Já tem uma conta? Faça login
			{:else}
				Não tem uma conta? Cadastre-se
			{/if}
		</button>
	</div>
	
	<div style="text-align: center; margin-top: 2rem; padding: 1rem; background: rgba(15, 52, 96, 0.3); border-radius: 5px;">
		<p style="margin: 0 0 0.5rem 0; color: #b8b8d1;">Usuário de teste:</p>
		<p style="margin: 0; color: #4ecca3; font-weight: bold;">Usuário: test | Senha: test123</p>
	</div>
</div>

<style>
	input:focus {
		outline: none;
		border-color: #e94560 !important;
	}
	
	button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(233, 69, 96, 0.4);
		transition: all 0.3s ease;
	}
</style>