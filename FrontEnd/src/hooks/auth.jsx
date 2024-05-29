import { createContext, useContext, useState } from 'react';

// chamando a api
import { api } from '../services/api';

// criação do contexto
const AuthContext = createContext({});

//componente fornecedor do contexto
function AuthProvider({ children }) {
    const [data, setData] = useState({});

    //função de autentificação 'email' e 'password'
    async function singIn({ email, password }){
        
        try{
            const response = await api.post("/sessions", { email, password });
            const { user, token } = response.data;
            
            // Inserindo um token do tipo Bearer com autorização para todas as requisições.
            api.defaults.headers.authorization = `Bearer ${token}`;
            setData({ user, token })

        } catch (error){
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível entrar.");
            }
        }
        
    }

    return(
        <AuthContext.Provider value={{ singIn, user: data.user }}>
            {children}
        </AuthContext.Provider>
    )
};

// Hook personalizado para usar o contexto
function useAuth(){
    const context = useContext(AuthContext);

    return context;
};

export { AuthProvider, useAuth };