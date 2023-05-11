import { Container } from "./styles";

export function Button({title, loading = false, ...rest}) {
    return (
    <Container
     type="button"
     desabled={loading}
     {...rest}
     >
      {loading ? 'Carregando...' : title}
    </Container>
    )
}