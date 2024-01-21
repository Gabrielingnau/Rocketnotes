import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiSearch } from 'react-icons/fi'

import { Header } from "../../components/Header";  
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";  
import { Input } from "../../components/Input";
import { Note } from "../../components/Note";
import { api } from "../../services/api";

export function Home() {

  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])
  const [notes, setNotes] = useState([])


function handleTagSelected(tagName) {
  if(tagName === "all"){
    return setTagsSelected([])
  }
 const alreadySelected = tagsSelected.includes(tagName);//quero saber se a tag já está selecionada

  if(alreadySelected){
    const filteredTags = tagsSelected.filter(tag => tag !== tagName)//tags filtradas
    setTagsSelected(filteredTags)
  }else {
    setTagsSelected(prevState => [...prevState, tagName])
    }
  }

  function handleDetails(id){ 
    navigate(`/details/${id}`)
   }

  useEffect(() => {
   async function fetchTags() {
    const response = await api.get("/tags")
    setTags(response.data)
   }

   fetchTags()
  }, [])

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }

    fetchNotes();
  }, [tagsSelected, search]);

    return (
        <Container>

            <Brand>
              <h1>Rocketnotes</h1>
            </Brand>

            <Header />

            <Menu>
            <li><ButtonText
             title="Todos" 
             isActive={tagsSelected.length === 0}
             onClick={() => handleTagSelected('all')}
            /></li>
              {
                tags && tags.map(tag => (
                  <li key={String(tag.id)}>
                    <ButtonText
                     title={tag.name}
                     onClick={ () => handleTagSelected(tag.name)}
                     isActive={tagsSelected.includes(tag.name)}
                  /></li>              
                ))
              }
            </Menu>

            <Search>
            <Input
             placeholder="Pesquisar pelo título"
             icon={FiSearch}
             onChange={(e) => setSearch(e.target.value)}
        />
            </Search>

            <Content>
            {
            notes.map(note => (
              <Note
                key={String(note.id)}
                data={note}
                onClick={() => handleDetails(note.id)} //passando o id para dentro da função (ele ficará na url da página quando eu clicar e me redirecionará para a página de details da nota)
              />
            ))
          }
            </Content>

            <NewNote to="New">
               <FiPlus/>
               Criar nota
            </NewNote>

        </Container>
    )
}