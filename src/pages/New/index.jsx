import { Container, Form} from "./styles"
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { ButtonText } from '../../components/ButtonText';

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";  
import { Section } from "../../components/Section";

import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";

export function New() {

    const [title, setTitle] = useState()
    const [description, setDescripition] = useState()
    
    const [links, setLinks] = useState([])
    const [newlink, setNewlink] = useState("")
    
    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState("")
    
    const navigate = useNavigate();
    const {sendNewNote} = useAuth();

    function handleBack() {
		navigate(-1);
	}

    function handleAddLink() {
      setLinks(prevState => [...prevState, newlink])
      setNewlink("")
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag])
      setNewTag("")
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted))
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(Tag => Tag !== deleted))
    }


    async function handleNewNote(){
        if(!title){
            return alert("Digite o titulo da nota")
        }
        if(newlink) {
            return alert("Voçe deixou um link no campo para adicionar, mais não clicou em adicionar. Clique em adicionar ou então deixe o campo vazio.")
        }   
        if(newTag) {
            return alert("Voçe deixou uma tag no campo para adicionar, mais não clicou em adicionar. Clique em adicionar ou então deixe o campo vazio.")
        } 
        await sendNewNote(title, description, tags, links)
        navigate("/")
    }

    return (
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText
							title="voltar"
							onClick={handleBack}
						/>
                    </header>
                    <Input
                     placeholder="Titulo"
                     onChange={e => setTitle(e.target.value)}
                    />
                    <Textarea 
                    placeholder="Observações"
                    onChange={e => setDescripition(e.target.value)}
                    />

                    <Section title="Links uteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                 key={String(index)}
                                 value={link} 
                                 onClick={() => handleRemoveLink(link)}                     
                                />
                            ))
                        }
                        <NoteItem 
                        isNew 
                        placeholder="Novo link"
                        value={newlink} 
                        onChange={e => setNewlink(e.target.value)} 
                        onClick={handleAddLink}                     
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                        {
                            tags.map((tag, index) => (
                                <NoteItem 
                                 key={String(index)}
                                 value={tag} 
                                 onClick={() => handleRemoveTag(tag)}                     
                                />
                            ))
                        }
                        <NoteItem 
                        isNew 
                        placeholder="Novo tag"
                        value={newTag} 
                        onChange={e => setNewTag(e.target.value)} 
                        onClick={handleAddTag}                     
                        />
                        </div>
                    </Section>
                    

                    <Button 
                    title="Salvar"
                    onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    )
}