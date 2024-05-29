import { Container } from './style';

// Essa função vai mostrar os input e os icons.
// No icon: Icon fez a transformação do icon para Icon.
export function Input({icon: Icon, ...rest}){
    return(
        <Container>
           
            {Icon && <Icon size={20} />}
            <input {...rest} />
        </Container>
    )
}