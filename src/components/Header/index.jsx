import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logaut } from "./styles";
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const {SignOut, user} = useAuth()

  const navigation = useNavigate()

  function handleSignOut(){
    navigation('/')
    SignOut() 
  }

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    return (
        <Container>
          <Profile to="Profile">
            <img src={avatarURL} 
            alt={user.name} />

            <div>
                <span>Bem vindo</span>
                <strong>{user.name}</strong>
            </div>
          </Profile>

          <Logaut onClick={handleSignOut}>
            <RiShutDownLine/>
          </Logaut>
        </Container>
    )
}