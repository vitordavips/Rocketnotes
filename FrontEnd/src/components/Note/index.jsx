import { Container } from "./style";
import { Tag } from "./../Tag";

export function Note({ data, ...rest }) {
    return(
        //{data.tile} aqui aonde vai ficar o título da tag.

        <Container {...rest}>
            <h1>{data.title}</h1>

            {
                //aqui vai ser criado uma tag e SE ela existir 
                data.tags &&
                <footer>
                    {
                        // Foi criado as tags, o map vai percorrer cada tag.
                        // foi criado uma chave para indentificar cada elemento.
                        data.tags.map(tag => <Tag key={tag.name} title={tag.name} />)
                    }
                </footer>
            }
        </Container>
    )
}