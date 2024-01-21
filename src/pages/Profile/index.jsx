import { Container, Form, Avatar} from "./styles"
import { api } from "../../services/api";


import { useState } from "react";
import { useAuth } from "../../hooks/auth";

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera} from 'react-icons/fi';

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const {user, updatedProfile} = useAuth()
  
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [passwordOld, setPAsswordOld] = useState()
    const [passwordNew, setPAsswordNew] = useState()

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarURL)
    const [avatarFile, setAvatarFile] = useState(null)

    const navigate = useNavigate()

  function handleBack(){
    navigate(-1) //voltar na rota anterior
  }


    function handleUpdate() {
        const updated = {
            email,
            name,
            password: passwordNew,
            old_password: passwordOld,
        }

        const userUpdated = Object.assign(user, updated)

        updatedProfile({ user: userUpdated, avatarFile })
    }

    function hadleChangeAvatar(event) {
        const file = event.target.files[0]
        setAvatarFile(file)
        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview)
    }

    return (
        <Container>
            <header>
            <button type='button' onClick={handleBack}>
          <FiArrowLeft/>
        </button>
            </header>    
            <Form>
              <Avatar>
                <img src={avatar} 
                alt={user.name} />
                <label htmlFor="Avatar">

                    <FiCamera/>

                    <input id="Avatar" 
                    type="file" 
                    onChange={hadleChangeAvatar}
                    />
                    
                </label>

              </Avatar>
            <Input
            placeholder="Nome"
            type="text"
            icon={FiUser}
            value={name}
            onChange={e => setName(e.target.value)}
            />
            <Input
            placeholder="E-mail"
            type="text"
            icon={FiMail}
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            <Input
            placeholder="Senha atual"
            type="password"
            icon={FiLock}
            onChange={e => setPAsswordOld(e.target.value)}
            />
            <Input
            placeholder="Nova senha"
            type="password"
            icon={FiLock}
            onChange={e => setPAsswordNew(e.target.value)}
            />
            
            <Button title="Salvar" onClick={handleUpdate}/>
                
        </Form>

        </Container>
    )
}