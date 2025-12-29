// Armazenamento em memória
const users = new Map();
const sessions = new Map();

// Usuário padrão para teste
users.set("test", {
    username: "test",
    password: "test123",
    balance: 99999,
    lastLogin: null
});

export const userStore = {
    // Autenticar usuário
    authenticate(username, password) {
        const user = users.get(username);
        if (user && user.password === password) {
            user.lastLogin = new Date();
            
            // Criar sessão
            const sessionId = Math.random().toString(36).substring(2);
            sessions.set(sessionId, {
                username,
                created: new Date(),
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
            });
            
            return {
                success: true,
                sessionId,
                user: {
                    username: user.username,
                    balance: user.balance
                }
            };
        }
        return { success: false, error: "Credenciais inválidas" };
    },

    // Verificar sessão
    getSession(sessionId) {
        const session = sessions.get(sessionId);
        if (!session) return null;
        
        if (session.expires < new Date()) {
            sessions.delete(sessionId);
            return null;
        }
        
        return session;
    },

    // Obter usuário
    getUser(username) {
        return users.get(username);
    },

    // Criar novo usuário
    register(username, password) {
        if (users.has(username)) {
            return { success: false, error: "Usuário já existe" };
        }
        
        users.set(username, {
            username,
            password,
            balance: 99999,
            lastLogin: new Date()
        });
        
        return { success: true };
    },

    // Atualizar saldo
    updateBalance(username, amount) {
        const user = users.get(username);
        if (!user) return { success: false, error: "Usuário não encontrado" };
        
        const newBalance = user.balance + amount;
        if (newBalance < 0) {
            return { success: false, error: "Saldo insuficiente" };
        }
        
        user.balance = newBalance;
        return { success: true, newBalance };
    },

    // Fazer aposta
    placeBet(username, betAmount) {
        const user = users.get(username);
        if (!user) return { success: false, error: "Usuário não encontrado" };
        
        if (user.balance < betAmount) {
            return { success: false, error: "Saldo insuficiente" };
        }
        
        // Gerar resultado do slot
        const symbols = ["🍒", "🍋", "🍊", "🍇", "🔔", "⭐", "7️⃣", "💎"];
        const reels = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        // Calcular vitória
        let winAmount = 0;
        if (reels[0] === reels[1] && reels[1] === reels[2]) {
            // Três símbolos iguais
            winAmount = betAmount * 10;
        } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
            // Dois símbolos iguais
            winAmount = betAmount * 2;
        }
        
        // Atualizar saldo
        const netChange = winAmount - betAmount;
        user.balance += netChange;
        
        return {
            success: true,
            reels,
            betAmount,
            winAmount,
            netChange,
            newBalance: user.balance,
            isWin: winAmount > 0
        };
    },

    // Logout
    logout(sessionId) {
        sessions.delete(sessionId);
        return { success: true };
    }
};