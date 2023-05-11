import {Container, Links, Content} from "./styles";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";  
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";   
import { ButtonText } from "../../components/ButtonText";      

export function Details() {

  return (
    <Container>
      <Header/>
      <main>
        <Content>
      <ButtonText title="Excluir nota"/>
      <h1>
        Introdução ao react
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni praesentium 
        accusantium optio totam esse earum eius quas, voluptate accusamus 
        iure placeat est? Dolorum impedit sapiente ullam aut adipisci! Eaque, accusantium.
      </p>
      <Section title="Links Uteis">
        <Links>
         <li><a href="#">https://www.rocketseat.com.br</a></li> 
         <li><a href="#">https://www.rocketseat.com.br</a></li>    
        </Links>
      </Section>
      <Section title="Componentes">
         <Tag title="Express" />
         <Tag title="Node" />
      </Section>
      <Button title="voltar"/>
        </Content>
      </main>
    </Container>   

  )
};
