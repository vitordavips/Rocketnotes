// Importa funções do React: createContext, useContext, e useState
import { createContext, useContext, useState, useEffect } from 'react';

// Importa a instância da API configurada
import { api } from '../services/api';

// Criação do contexto de autenticação
const AuthContext = createContext({});

// Componente fornecedor do contexto de autenticação
function AuthProvider({ children }) {
    // Define um estado local para armazenar os dados de autenticação
    const [data, setData] = useState({});

    // Função de autenticação que aceita email e password
    async function singIn({ email, password }) {
        try {
            // Faz uma requisição POST para a rota /sessions com email e password
            const response = await api.post("/sessions", { email, password });
            // Extrai o usuário e o token da resposta
            const { user, token } = response.data;

            localStorage.setItem('@rocketnotes:user', JSON.stringify(user));
            localStorage.setItem('@rocketnotes:token', token);

            // Configura o token de autorização para todas as requisições futuras
            api.defaults.headers.authorization = `Bearer ${token}`;

            // Armazena o usuário e o token no estado local
            setData({ user, token });

        } catch (error) {
            // Trata erros de resposta do servidor
            if (error.response) {
                alert(error.response.data.message);
            } else {
                // Trata outros tipos de erros (ex.: falta de conexão)
                alert("Não foi possível entrar.");
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('@rocketnotes:token');
        const user = localStorage.getItem('@rocketnotes:user');

        if(token && user){
            api.defaults.headers.authorization = `Bearer ${token}`;

            setData({
                token,
                user: JSON.parse(user)
            });
        }

    }, []);

    // Renderiza o provedor do contexto com a função singIn e os dados do usuário
    return (
        <AuthContext.Provider value={{ singIn, user: data.user }}>
            {children}
        </AuthContext.Provider>
    )
};

// Hook personalizado para usar o contexto de autenticação
function useAuth() {
    // Obtém o contexto de autenticação
    const context = useContext(AuthContext);

    // Retorna o contexto
    return context;
};

// Exporta o provedor de autenticação e o hook personalizado
export { AuthProvider, useAuth };