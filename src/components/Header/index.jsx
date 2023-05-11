import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logaut } from "./styles";

export function Header() {

    return (
        <Container>
          <Profile to="Profile">
            <img src="https://github.com/Gabrielingnau.png" 
            alt="imagem de Gabriel Lingnau" />

            <div>
                <span>Bem vindo</span>
                <strong>Gabriel Lingnau</strong>
            </div>
          </Profile>

          <Logaut>
            <RiShutDownLine/>
          </Logaut>
        </Container>
    )
}