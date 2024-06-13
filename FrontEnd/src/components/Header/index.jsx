//Aqui vai está importando o ícone do button com a biblioteca React-icons.
import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles';
import { useAuth } from '../../hooks/auth';

export function Header() {
    return (
        <Container>
            <Profile to="/profile">
                <img 
                    src="https://github.com/vitordavips.png"
                    alt="Foto do usuário"
                />

                <div>
                    <span>Bem-vindos</span>
                    <strong>Vitor Davi</strong>
                </div>
            </Profile>

            <Logout>
                <RiShutDownLine />
            </Logout>
        </Container>
    );
}