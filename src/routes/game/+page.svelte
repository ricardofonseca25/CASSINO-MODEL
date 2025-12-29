<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	
	export let data;
	
	// Redirecionar se não estiver logado
	$: if (!data.loggedIn) {
		goto('/login');
	}
	
	let reels = ['🍒', '🍋', '🍊'];
	let isSpinning = false;
	let betAmount = 100;
	let lastResult = null;
	let showResult = false;
	
	const betOptions = [100, 500, 1000];
	
	async function spin() {
		if (isSpinning) return;
		
		isSpinning = true;
		showResult = false;
		
		// Animação dos rolos
		const spinDuration = 2000;
		const startTime = Date.now();
		
		function animate() {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / spinDuration, 1);
			
			if (progress < 1) {
				// Girar símbolos aleatórios durante a animação
				reels = [
					['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '7️⃣', '💎'][Math.floor(Math.random() * 8)],
					['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '7️⃣', '💎'][Math.floor(Math.random() * 8)],
					['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '7️⃣', '💎'][Math.floor(Math.random() * 8)]
				];
				requestAnimationFrame(animate);
			} else {
				// Obter resultado real do servidor
				fetch('/api/spin', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ betAmount })
				})
				.then(response => response.json())
				.then(result => {
					isSpinning = false;
					if (result.success) {
						reels = result.reels;
						lastResult = result;
						showResult = true;
						
						// Atualizar saldo na interface
						data.user.balance = result.newBalance;
					}
				})
				.catch(() => {
					isSpinning = false;
				});
			}
		}
		
		animate();
	}
	
	function resetGame() {
		showResult = false;
		lastResult = null;
	}
</script>

{#if data.loggedIn}
	<div style="max-width: 800px; margin: 0 auto;">
		<div style="text-align: center; margin-bottom: 3rem;">
			<h1 style="color: #e94560; font-size: 2.5rem; margin-bottom: 0.5rem;">
				🎰 SLOTS_TESTs
			</h1>
			<p style="color: #b8b8d1; font-size: 1.1rem;">
				Bem-vindo, {data.user.username}! Faça suas apostas e teste sua sorte!
			</p>
		</div>
		
		<!-- Display do Slot -->
		<div style="background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%); border-radius: 20px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border: 3px solid #e94560;">
			<div style="display: flex; justify-content: space-around; margin-bottom: 2rem;">
				{#each reels as reel, i}
					<div style="
						width: 120px;
						height: 120px;
						background: rgba(255,255,255,0.1);
						border-radius: 15px;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 4rem;
						border: 3px solid {i === 1 ? '#4ecca3' : '#e94560'};
						animation: {isSpinning ? 'spin 0.2s infinite' : 'none'};
					">
						{reel}
					</div>
				{/each}
			</div>
			
			{#if showResult && lastResult}
				<div style="
					background: {lastResult.isWin ? 'rgba(78, 204, 163, 0.2)' : 'rgba(233, 69, 96, 0.2)'};
					padding: 1rem;
					border-radius: 10px;
					text-align: center;
					margin-bottom: 1.5rem;
					border: 2px solid {lastResult.isWin ? '#4ecca3' : '#e94560'};
				">
					<h3 style="color: {lastResult.isWin ? '#4ecca3' : '#e94560'}; margin: 0;">
						{#if lastResult.isWin}
							🎉 PARABÉNS! Você ganhou {lastResult.winAmount} pesos!
						{:else}
							😢 Não foi desta vez! Tente novamente!
						{/if}
					</h3>
					<p style="color: #b8b8d1; margin: 0.5rem 0 0 0;">
						Aposta: {lastResult.betAmount} pesos | 
						Resultado: {lastResult.netChange > 0 ? '+' : ''}{lastResult.netChange} pesos
					</p>
				</div>
			{/if}
			
			<!-- Controles de Aposta -->
			<div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
				<h3 style="color: #4ecca3; margin-top: 0; text-align: center;">Valor da Aposta</h3>
				<div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
					{#each betOptions as amount}
						<button 
							on:click={() => betAmount = amount}
							disabled={isSpinning || amount > data.user.balance}
							style="
								background: {betAmount === amount ? '#e94560' : 'rgba(255,255,255,0.1)'};
								color: white;
								border: none;
								padding: 0.75rem 1.5rem;
								border-radius: 5px;
								cursor: {isSpinning || amount > data.user.balance ? 'not-allowed' : 'pointer'};
								opacity: {amount > data.user.balance ? 0.5 : 1};
							"
						>
							{amount} pesos
						</button>
					{/each}
				</div>
				
				<div style="text-align: center; margin-top: 1rem;">
					<button 
						on:click={() => betAmount = Math.min(1000, data.user.balance)}
						disabled={isSpinning || data.user.balance < 100}
						style="
							background: rgba(78, 204, 163, 0.2);
							color: #4ecca3;
							border: 1px solid #4ecca3;
							padding: 0.5rem 1rem;
							border-radius: 5px;
							cursor: {isSpinning || data.user.balance < 100 ? 'not-allowed' : 'pointer'};
							font-size: 0.9rem;
						"
					>
						Aposta Máxima ({Math.min(1000, data.user.balance)} pesos)
					</button>
				</div>
			</div>
			
			<!-- Botão Girar -->
			<div style="text-align: center;">
				<button 
					on:click={spin}
					disabled={isSpinning || betAmount > data.user.balance}
					style="
						background: linear-gradient(90deg, #e94560 0%, #ff6b8b 100%);
						color: white;
						border: none;
						padding: 1.2rem 4rem;
						font-size: 1.3rem;
						border-radius: 50px;
						cursor: {isSpinning || betAmount > data.user.balance ? 'not-allowed' : 'pointer'};
						font-weight: bold;
						opacity: {isSpinning || betAmount > data.user.balance ? 0.7 : 1};
					"
				>
					{#if isSpinning}
						⏳ GIRANDO...
					{:else}
						🎮 GIRAR SLOTS
					{/if}
				</button>
				
				{#if betAmount > data.user.balance}
					<p style="color: #e94560; margin-top: 1rem;">
						Saldo insuficiente para esta aposta!
					</p>
				{/if}
			</div>
		</div>
		
		<!-- Informações do Jogador -->
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
			<div style="background: rgba(15, 52, 96, 0.3); padding: 1.5rem; border-radius: 10px;">
				<h3 style="color: #4ecca3; margin-top: 0;">💰 Saldo Atual</h3>
				<p style="font-size: 2rem; font-weight: bold; color: white; margin: 0;">
					{data.user.balance} pesos
				</p>
			</div>
			
			<div style="background: rgba(233, 69, 96, 0.1); padding: 1.5rem; border-radius: 10px;">
				<h3 style="color: #e94560; margin-top: 0;">🎯 Aposta Atual</h3>
				<p style="font-size: 2rem; font-weight: bold; color: white; margin: 0;">
					{betAmount} pesos
				</p>
			</div>
			
			<div style="background: rgba(78, 204, 163, 0.1); padding: 1.5rem; border-radius: 10px;">
				<h3 style="color: #4ecca3; margin-top: 0;">📊 Tabela de Pagamentos</h3>
				<div style="font-size: 0.9rem;">
					<p style="margin: 0.5rem 0;">3 símbolos iguais: 10x</p>
					<p style="margin: 0.5rem 0;">2 símbolos iguais: 2x</p>
					<p style="margin: 0.5rem 0;">Nenhum igual: 0x</p>
				</div>
			</div>
		</div>
		
		<!-- Botões de Ação -->
		<div style="text-align: center; display: flex; gap: 1rem; justify-content: center;">
			<button 
				on:click={resetGame}
				style="
					background: rgba(255,255,255,0.1);
					color: white;
					border: 1px solid rgba(255,255,255,0.3);
					padding: 0.75rem 1.5rem;
					border-radius: 5px;
					cursor: pointer;
				"
			>
				🔄 Reiniciar Jogo
			</button>
			
			<button 
				on:click={() => goto('/')}
				style="
					background: rgba(78, 204, 163, 0.2);
					color: #4ecca3;
					border: 1px solid #4ecca3;
					padding: 0.75rem 1.5rem;
					border-radius: 5px;
					cursor: pointer;
				"
			>
				🏠 Voltar ao Início
			</button>
		</div>
	</div>
	
	<style>
		@keyframes spin {
			0% { transform: translateY(0); }
			50% { transform: translateY(10px); }
			100% { transform: translateY(0); }
		}
		
		button:hover:not(:disabled) {
			transform: translateY(-3px);
			box-shadow: 0 10px 20px rgba(0,0,0,0.3);
			transition: all 0.3s ease;
		}
	</style>
{:else}
	<div style="text-align: center; padding: 4rem 1rem;">
		<h2 style="color: #e94560;">Redirecionando para login...</h2>
		<p style="color: #b8b8d1;">Por favor, faça login para acessar o jogo.</p>
	</div>
{/if}