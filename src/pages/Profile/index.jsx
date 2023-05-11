import { Container, Form, Avatar} from "./styles"

import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera} from 'react-icons/fi'

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";

export function Profile() {

    return (
        <Container>
            <header>
            <Link to="/">
                <FiArrowLeft/>
            </Link>  
            </header>    
            <Form>
              <Avatar>
                <img src="https://github.com/Gabrielingnau.png" alt="Imagem de Gabriel Lingnau" />
                <label htmlFor="Avatar">
                    <FiCamera/>
                    <input id="Avatar" type="file" />
                </label>
              </Avatar>
            <Input
            placeholder="Nome"
            type="text"
            icon={FiUser}
            />
            <Input
            placeholder="E-mail"
            type="text"
            icon={FiMail}
            />
            <Input
            placeholder="Senha atual"
            type="password"
            icon={FiLock}
            />
            <Input
            placeholder="Nova senha"
            type="password"
            icon={FiLock}
            />
            
            <Button title="Salvar"/>
                
        </Form>

        </Container>
    )
}