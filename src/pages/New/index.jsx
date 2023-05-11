import { Container, Form} from "./styles"

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";  
import { Section } from "../../components/Section";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";

export function New() {

    return (
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/">Voltar</Link>
                    </header>
                    <Input placeholder="Titulo"/>
                    <Textarea placeholder="Observações"/>

                    <Section title="Links uteis">
                        <NoteItem value="https://rocktseat.com.br"/>
                        <NoteItem isNew placeholder="Novo link"/>
                    </Section>
                    <Section title="Marcadores">
                     <div className="tags">
                        <NoteItem value="react"/>
                        <NoteItem isNew placeholder="Nova tag"/>
                     </div>
                    </Section>

                    <Button title="Salvar"/>
                </Form>
            </main>
        </Container>
    )
}