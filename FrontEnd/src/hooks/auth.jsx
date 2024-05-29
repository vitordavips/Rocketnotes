import { createContext, useContext } from 'react';

// chamando a api
import { api } from '../services/api';

// criação do contexto
const AuthContext = createContext({});

//componente fornecedor do contexto
function AuthProvider({ children }) {

    //função de autentificação 'email' e 'password'
    async function singIn({ email, password }){
        
        try{
            const response = await api.post("/sessions", { email, password });
            console.log(response);
        } catch (error){
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível entrar.");
            }
        }
        
    }

    return(
        <AuthContext.Provider value={{ singIn }}>
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