<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	
	export let data;
	
	let showTestLoginAlert = false;
	
	function startGame() {
		if (data.loggedIn) {
			goto('/game');
		} else {
			goto('/login');
		}
	}
	
	async function quickTestLogin() {
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: 'test', password: 'test123' })
			});
			
			if (response.ok) {
				location.reload();
			} else {
				showTestLoginAlert = true;
				setTimeout(() => showTestLoginAlert = false, 3000);
			}
		} catch (error) {
			showTestLoginAlert = true;
			setTimeout(() => showTestLoginAlert = false, 3000);
		}
	}
</script>

<!-- Hero Section -->
<div class="hero">
	<div class="hero-content">
		<div class="logo-container">
			<div class="slot-machine">
				<div class="slot-reel">🎰</div>
				<div class="slot-reel">💎</div>
				<div class="slot-reel">7️⃣</div>
			</div>
			<h1 class="hero-title">
				Cassino <span class="highlight">Model Example</span> <span class="subtitle">Model Example</span>
			</h1>
		</div>
		
		<p class="hero-description">
			Experimente a emoção dos slots com <strong>99.999 pesos gratuitos</strong>!
		</p>
		
		<!-- User Status -->
		{#if data.loggedIn}
			<div class="user-card">
				<div class="user-info">
					<div class="avatar">
						👤
					</div>
					<div class="user-details">
						<h3>Bem-vindo de volta!</h3>
						<div class="user-stats">
							<span class="stat">
								<span class="stat-label">Usuário:</span>
								<span class="stat-value">{data.user.username}</span>
							</span>
							<span class="stat">
								<span class="stat-label">Saldo:</span>
								<span class="stat-value balance">{data.user.balance.toLocaleString()} pesos</span>
							</span>
						</div>
					</div>
				</div>
				<button class="play-button" on:click={startGame}>
					<span class="button-icon">🎮</span>
					<span class="button-text">JOGAR AGORA</span>
					<span class="button-arrow">→</span>
				</button>
			</div>
		{:else}
			<div class="cta-buttons">
				<button class="cta-button primary" on:click={() => goto('/login')}>
					<span class="button-icon">🔐</span>
					<span class="button-text">Login / Cadastro</span>
				</button>
				<button class="cta-button secondary" on:click={quickTestLogin}>
					<span class="button-icon">⚡</span>
					<span class="button-text">Teste Rápido</span>
					<span class="button-badge">test/test123</span>
				</button>
			</div>
			
			{#if showTestLoginAlert}
				<div class="alert">
					<span class="alert-icon">⚠️</span>
					<p>Logando com usuário de teste...</p>
				</div>
			{/if}
		{/if}
	</div>
	
	<!-- Animated Background Elements -->
	<div class="floating-coins">
		{#each Array(15) as _, i}
			<div class="coin" style="--i: {i}; --delay: {i * 0.2}s;">💰</div>
		{/each}
	</div>
</div>

<!-- Features Section -->
<div class="features">
	<div class="section-header">
		<h2>🎯 Como Jogar no Cassino Test</h2>
		<p class="section-subtitle">Siga estes passos simples e comece a ganhar!</p>
	</div>
	
	<div class="features-grid">
		<div class="feature-card">
			<div class="feature-icon">1️⃣</div>
			<div class="feature-content">
				<h3>Crie Sua Conta</h3>
				<p>Faça login ou cadastre-se em segundos. Use nosso usuário de teste para começar imediatamente.</p>
			</div>
			<div class="feature-arrow">→</div>
		</div>
		
		<div class="feature-card">
			<div class="feature-icon">2️⃣</div>
			<div class="feature-content">
				<h3>Receba Seus Créditos</h3>
				<p>Todos os novos jogadores recebem <strong>99.999 pesos</strong> gratuitos para testar os slots.</p>
			</div>
			<div class="feature-arrow">→</div>
		</div>
		
		<div class="feature-card">
			<div class="feature-icon">3️⃣</div>
			<div class="feature-content">
				<h3>Escolha Sua Aposta</h3>
				<p>Selecione o valor da aposta que combina com seu estilo: 100, 500 ou 1000 pesos por giro.</p>
			</div>
			<div class="feature-arrow">→</div>
		</div>
		
		<div class="feature-card">
			<div class="feature-icon">4️⃣</div>
			<div class="feature-content">
				<h3>Gire e Ganhe!</h3>
				<p>Combine símbolos iguais para multiplicar seus ganhos. A sorte está ao seu alcance!</p>
			</div>
			<div class="feature-arrow">→</div>
		</div>
	</div>
</div>

<!-- Game Preview -->
<div class="game-preview">
	<div class="preview-content">
		<div class="preview-text">
			<h2>🎰 Experimente o SLOTS 1</h2>
			<p>Nosso exclusivo jogo de slots com gráficos impressionantes e mecânicas de jogo emocionantes.</p>
			<ul class="preview-list">
				<li><span class="check">✓</span> 8 símbolos diferentes e especiais</li>
				<li><span class="check">✓</span> Multiplicadores de até 10x</li>
				<li><span class="check">✓</span> Interface intuitiva e responsiva</li>
				<li><span class="check">✓</span> Animações realistas</li>
			</ul>
			<button class="preview-button" on:click={startGame}>
				<span class="button-icon">🎮</span>
				Experimentar Agora
			</button>
		</div>
		<div class="preview-visual">
			<div class="slot-preview">
				<div class="slot-row">
					<div class="slot-preview-cell spinning">🍒</div>
					<div class="slot-preview-cell">🍋</div>
					<div class="slot-preview-cell">💎</div>
				</div>
				<div class="slot-row">
					<div class="slot-preview-cell">⭐</div>
					<div class="slot-preview-cell spinning">⭐</div>
					<div class="slot-preview-cell">⭐</div>
				</div>
				<div class="slot-row">
					<div class="slot-preview-cell">7️⃣</div>
					<div class="slot-preview-cell">🔔</div>
					<div class="slot-preview-cell spinning">7️⃣</div>
				</div>
				<div class="slot-winner">
					<div class="winner-text">GANHOU! +2.000</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Payouts Section -->
<div class="payouts">
	<h2>💰 Tabela de Pagamentos</h2>
	<div class="payouts-grid">
		<div class="payout-card">
			<div class="payout-symbols">🍒 🍒 🍒</div>
			<h3>3 Símbolos Iguais</h3>
			<div class="payout-multiplier">10×</div>
			<p class="payout-example">Aposta 100 = Ganho 1.000</p>
		</div>
		
		<div class="payout-card highlight">
			<div class="payout-symbols">⭐ ⭐</div>
			<h3>2 Símbolos Iguais</h3>
			<div class="payout-multiplier">2×</div>
			<p class="payout-example">Aposta 500 = Ganho 1.000</p>
			<div class="popular-badge">MAIS COMUM</div>
		</div>
		
		<div class="payout-card">
			<div class="payout-symbols">💎</div>
			<h3>Símbolo Diamante</h3>
			<div class="payout-multiplier">Bônus</div>
			<p class="payout-example">Desbloqueia rodadas extras</p>
		</div>
	</div>
</div>

<!-- Final CTA -->
<div class="final-cta">
	<div class="cta-content">
		<h2>Pronto para testar sua sorte?</h2>
		<p>TESTE.</p>
		
		{#if data.loggedIn}
			<div class="final-buttons">
				<button class="final-button primary" on:click={startGame}>
					Continuar Jogando
				</button>
				<button class="final-button secondary" on:click={() => goto('/game')}>
					Ver Histórico
				</button>
			</div>
		{:else}
			<div class="final-buttons">
				<button class="final-button primary" on:click={() => goto('/login')}>
					Criar Conta Grátis
				</button>
				<button class="final-button secondary" on:click={quickTestLogin}>
					Testar Agora sem Cadastro
				</button>
			</div>
		{/if}
		
		<div class="security-badge">
			<span class="security-icon">🛡️</span>
			<span class="security-text">Ambiente 100% seguro para teste • Sem dinheiro real • Para maiores de 18 anos</span>
		</div>
	</div>
</div>

<style>
	:global(body) {
		background: linear-gradient(135deg, #0a0a1a 0%, #151530 50%, #0a0a1a 100%);
		background-attachment: fixed;
		min-height: 100vh;
	}
	
	/* Hero Section */
	.hero {
		position: relative;
		padding: 6rem 1rem 8rem;
		text-align: center;
		overflow: hidden;
		background: radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 50%),
					radial-gradient(circle at 80% 20%, rgba(233, 69, 96, 0.1) 0%, transparent 50%);
	}
	
	.hero-content {
		max-width: 1200px;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}
	
	.logo-container {
		margin-bottom: 2rem;
	}
	
	.slot-machine {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}
	
	.slot-reel {
		width: 80px;
		height: 80px;
		background: linear-gradient(145deg, #1e1e40, #0f0f20);
		border-radius: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		border: 2px solid #4ecca3;
		box-shadow: 0 10px 30px rgba(78, 204, 163, 0.3);
		animation: float 3s ease-in-out infinite;
	}
	
	.slot-reel:nth-child(2) {
		animation-delay: 0.5s;
		border-color: #e94560;
		box-shadow: 0 10px 30px rgba(233, 69, 96, 0.3);
	}
	
	.slot-reel:nth-child(3) {
		animation-delay: 1s;
		border-color: #6d67e4;
		box-shadow: 0 10px 30px rgba(109, 103, 228, 0.3);
	}
	
	.hero-title {
		font-size: 4rem;
		background: linear-gradient(90deg, #e94560, #6d67e4, #4ecca3);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0 0 0.5rem 0;
		font-weight: 800;
		letter-spacing: -1px;
	}
	
	.highlight {
		background: linear-gradient(90deg, #ff6b8b, #ffa36c);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.subtitle {
		display: block;
		font-size: 2rem;
		color: #b8b8d1;
		font-weight: 400;
		margin-top: 0.5rem;
	}
	
	.hero-description {
		font-size: 1.3rem;
		color: #b8b8d1;
		max-width: 800px;
		margin: 0 auto 3rem;
		line-height: 1.6;
	}
	
	.hero-description strong {
		color: #4ecca3;
	}
	
	/* User Card */
	.user-card {
		background: rgba(30, 30, 64, 0.7);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 2rem;
		max-width: 600px;
		margin: 0 auto 2rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}
	
	.user-info {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}
	
	.avatar {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #4ecca3, #6d67e4);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.5rem;
		flex-shrink: 0;
	}
	
	.user-details h3 {
		margin: 0 0 0.5rem 0;
		color: white;
		font-size: 1.5rem;
	}
	
	.user-stats {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
	}
	
	.stat {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	
	.stat-label {
		color: #8a8ab5;
		font-size: 0.9rem;
	}
	
	.stat-value {
		color: white;
		font-size: 1.2rem;
		font-weight: 600;
	}
	
	.balance {
		color: #4ecca3;
		font-weight: 700;
	}
	
	/* Buttons */
	.cta-buttons {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		max-width: 800px;
		margin: 0 auto 2rem;
		flex-wrap: wrap;
	}
	
	.cta-button {
		padding: 1.2rem 2.5rem;
		border: none;
		border-radius: 15px;
		font-size: 1.2rem;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		transition: all 0.3s ease;
		min-width: 250px;
		justify-content: center;
	}
	
	.cta-button.primary {
		background: linear-gradient(90deg, #4ecca3, #6d67e4);
		color: white;
	}
	
	.cta-button.secondary {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border: 2px solid rgba(255, 255, 255, 0.2);
	}
	
	.button-icon {
		font-size: 1.5rem;
	}
	
	.button-badge {
		background: rgba(0, 0, 0, 0.3);
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.9rem;
		margin-left: auto;
	}
	
	.play-button {
		background: linear-gradient(90deg, #e94560, #ff6b8b);
		color: white;
		border: none;
		padding: 1.2rem 3rem;
		border-radius: 15px;
		font-size: 1.3rem;
		font-weight: 700;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 1rem;
		transition: all 0.3s ease;
		width: 100%;
		justify-content: center;
	}
	
	.button-arrow {
		font-size: 1.5rem;
		opacity: 0.8;
	}
	
	.cta-button:hover, .play-button:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
	}
	
	.cta-button.primary:hover {
		box-shadow: 0 15px 30px rgba(78, 204, 163, 0.4);
	}
	
	.play-button:hover {
		box-shadow: 0 15px 30px rgba(233, 69, 96, 0.4);
	}
	
	.cta-button.secondary:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.3);
	}
	
	/* Alert */
	.alert {
		background: rgba(233, 69, 96, 0.1);
		border: 1px solid rgba(233, 69, 96, 0.3);
		border-radius: 10px;
		padding: 1rem 1.5rem;
		max-width: 400px;
		margin: 1rem auto;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		animation: fadeIn 0.3s ease;
	}
	
	.alert-icon {
		font-size: 1.2rem;
	}
	
	.alert p {
		margin: 0;
		color: #e94560;
		font-weight: 500;
	}
	
	/* Floating Coins Animation */
	.floating-coins {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
	}
	
	.coin {
		position: absolute;
		font-size: 2rem;
		animation: floatCoin 20s linear infinite;
		opacity: 0.3;
		animation-delay: var(--delay);
	}
	
	.coin:nth-child(odd) {
		animation-duration: 25s;
	}
	
	/* Features Section */
	.features {
		padding: 5rem 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.section-header {
		text-align: center;
		margin-bottom: 4rem;
	}
	
	.section-header h2 {
		font-size: 2.5rem;
		color: white;
		margin: 0 0 1rem 0;
	}
	
	.section-subtitle {
		color: #8a8ab5;
		font-size: 1.2rem;
		max-width: 600px;
		margin: 0 auto;
	}
	
	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}
	
	.feature-card {
		background: rgba(30, 30, 64, 0.7);
		border-radius: 20px;
		padding: 2rem;
		display: flex;
		align-items: center;
		gap: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
		cursor: pointer;
	}
	
	.feature-card:hover {
		transform: translateY(-10px);
		background: rgba(40, 40, 80, 0.8);
		border-color: rgba(78, 204, 163, 0.3);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
	}
	
	.feature-icon {
		font-size: 2.5rem;
		flex-shrink: 0;
	}
	
	.feature-content h3 {
		color: white;
		margin: 0 0 0.5rem 0;
		font-size: 1.3rem;
	}
	
	.feature-content p {
		color: #b8b8d1;
		margin: 0;
		line-height: 1.5;
		font-size: 0.95rem;
	}
	
	.feature-arrow {
		margin-left: auto;
		font-size: 1.5rem;
		color: #4ecca3;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	
	.feature-card:hover .feature-arrow {
		opacity: 1;
	}
	
	/* Game Preview */
	.game-preview {
		background: linear-gradient(135deg, rgba(30, 30, 64, 0.8), rgba(15, 15, 40, 0.9));
		padding: 5rem 1rem;
		margin: 4rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.preview-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}
	
	.preview-text h2 {
		font-size: 2.5rem;
		color: white;
		margin: 0 0 1.5rem 0;
	}
	
	.preview-text p {
		color: #b8b8d1;
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 2rem;
	}
	
	.preview-list {
		list-style: none;
		padding: 0;
		margin: 0 0 2.5rem 0;
	}
	
	.preview-list li {
		color: #b8b8d1;
		margin-bottom: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	
	.check {
		color: #4ecca3;
		font-weight: bold;
		font-size: 1.2rem;
	}
	
	.preview-button {
		background: linear-gradient(90deg, #6d67e4, #4ecca3);
		color: white;
		border: none;
		padding: 1rem 2.5rem;
		border-radius: 10px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		transition: all 0.3s ease;
	}
	
	.preview-button:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 30px rgba(109, 103, 228, 0.4);
	}
	
	.slot-preview {
		background: rgba(10, 10, 26, 0.8);
		border-radius: 25px;
		padding: 2.5rem;
		border: 3px solid #4ecca3;
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
		position: relative;
		overflow: hidden;
	}
	
	.slot-row {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		justify-content: center;
	}
	
	.slot-preview-cell {
		width: 80px;
		height: 80px;
		background: linear-gradient(145deg, #1e1e40, #0f0f20);
		border-radius: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.5rem;
		border: 2px solid rgba(255, 255, 255, 0.2);
	}
	
	.slot-preview-cell.spinning {
		animation: spin 0.5s linear infinite;
		border-color: #e94560;
		background: linear-gradient(145deg, #e94560, #ff6b8b);
	}
	
	.slot-winner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(78, 204, 163, 0.9);
		padding: 1rem 2rem;
		border-radius: 10px;
		animation: pulse 2s infinite;
	}
	
	.winner-text {
		color: white;
		font-weight: 700;
		font-size: 1.2rem;
		white-space: nowrap;
	}
	
	/* Payouts Section */
	.payouts {
		padding: 5rem 1rem;
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}
	
	.payouts h2 {
		font-size: 2.5rem;
		color: white;
		margin: 0 0 4rem 0;
	}
	
	.payouts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}
	
	.payout-card {
		background: rgba(30, 30, 64, 0.7);
		border-radius: 20px;
		padding: 2.5rem;
		transition: all 0.3s ease;
		border: 2px solid transparent;
		position: relative;
	}
	
	.payout-card:hover {
		transform: translateY(-10px);
		border-color: rgba(78, 204, 163, 0.3);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
	}
	
	.payout-card.highlight {
		border-color: #e94560;
		background: rgba(233, 69, 96, 0.1);
	}
	
	.payout-symbols {
		font-size: 3rem;
		margin-bottom: 1.5rem;
	}
	
	.payout-card h3 {
		color: white;
		margin: 0 0 1rem 0;
		font-size: 1.5rem;
	}
	
	.payout-multiplier {
		font-size: 3rem;
		font-weight: 800;
		background: linear-gradient(90deg, #4ecca3, #6d67e4);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 1rem 0;
	}
	
	.payout-example {
		color: #b8b8d1;
		margin: 0;
		font-size: 0.95rem;
	}
	
	.popular-badge {
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		background: #e94560;
		color: white;
		padding: 0.5rem 1.5rem;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: 600;
		white-space: nowrap;
	}
	
	/* Final CTA */
	.final-cta {
		padding: 6rem 1rem;
		text-align: center;
		background: radial-gradient(circle at 50% 100%, rgba(109, 103, 228, 0.1) 0%, transparent 50%);
	}
	
	.cta-content {
		max-width: 800px;
		margin: 0 auto;
	}
	
	.cta-content h2 {
		font-size: 3rem;
		color: white;
		margin: 0 0 1.5rem 0;
	}
	
	.cta-content p {
		color: #b8b8d1;
		font-size: 1.2rem;
		margin-bottom: 3rem;
		line-height: 1.6;
	}
	
	.final-buttons {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}
	
	.final-button {
		padding: 1.2rem 3rem;
		border: none;
		border-radius: 15px;
		font-size: 1.2rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		min-width: 250px;
	}
	
	.final-button.primary {
		background: linear-gradient(90deg, #e94560, #ff6b8b);
		color: white;
	}
	
	.final-button.secondary {
		background: transparent;
		color: white;
		border: 2px solid rgba(255, 255, 255, 0.3);
	}
	
	.final-button:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
	}
	
	.final-button.primary:hover {
		box-shadow: 0 15px 30px rgba(233, 69, 96, 0.4);
	}
	
	.final-button.secondary:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.5);
	}
	
	.security-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(255, 255, 255, 0.05);
		padding: 1rem 1.5rem;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.security-icon {
		font-size: 1.2rem;
	}
	
	.security-text {
		color: #8a8ab5;
		font-size: 0.9rem;
	}
	
	/* Animations */
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-20px); }
	}
	
	@keyframes floatCoin {
		0% {
			transform: translateY(100vh) translateX(0) rotate(0deg);
			opacity: 0;
		}
		10% {
			opacity: 0.3;
		}
		90% {
			opacity: 0.3;
		}
		100% {
			transform: translateY(-100px) translateX(100px) rotate(360deg);
			opacity: 0;
		}
	}
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	@keyframes pulse {
		0%, 100% { transform: translate(-50%, -50%) scale(1); }
		50% { transform: translate(-50%, -50%) scale(1.05); }
	}
	
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
	}
	
	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 2.5rem;
		}
		
		.subtitle {
			font-size: 1.5rem;
		}
		
		.preview-content {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
		
		.cta-buttons, .final-buttons {
			flex-direction: column;
			align-items: center;
		}
		
		.cta-button, .final-button {
			width: 100%;
			max-width: 300px;
		}
		
		.user-info {
			flex-direction: column;
			text-align: center;
		}
		
		.user-stats {
			justify-content: center;
		}
		
		.slot-machine {
			gap: 0.5rem;
		}
		
		.slot-reel {
			width: 60px;
			height: 60px;
			font-size: 2rem;
		}
		
		.features-grid {
			grid-template-columns: 1fr;
		}
		
		.payouts-grid {
			grid-template-columns: 1fr;
		}
	}
</style>