//Aqui vai está importando o ícone do button com a biblioteca React-icons.
import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';


export function Header() {
    const { signOut, user } = useAuth();
    
    //const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    return (
        <Container>
            <Profile to="/profile">
                <img 
                    src="avatarUrl"
                    alt="Foto do usuário"
                />

                <div>
                    <span>Bem-vindos</span>
                    <strong>Vitor Davi</strong>
                </div>
            </Profile>

            <Logout onClick={signOut}>
                <RiShutDownLine />
            </Logout>
        </Container>
    );
}