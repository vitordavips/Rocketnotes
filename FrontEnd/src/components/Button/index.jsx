import { Container } from "./style";

export function Button({ title, loading = false, ...rest }) {
    //O rest vai pegar e esconder as propriedades no caso do button.
    //O loading = false caso oloading não seja informado ele via gerar um valor padrão.
    return(
        //O props vai mostrar a propriedades de uma variavel.
        <Container 
            type="button"
            disabled={loading}
            {...rest}
        >
            {loading ? 'Carregando...' : title}
        </Container>
        // Esse código é um if terminário {loading ? 'Carregando' : isso se chamar mas remcanhado}
    );
}