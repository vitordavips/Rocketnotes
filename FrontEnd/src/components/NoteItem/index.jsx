import { FiPlus, FiX } from 'react-icons/fi';
import { Container } from './styles';

//isNew server pra saber se é pra adicionar um novo item
export function NoteItem({ isNew, value, onClick, ...rest }) {
    return(
        <Container isNew={isNew}>
            <input 
                type="text" 
                value={value} 
                readOnly={!isNew}
                {...rest}
            />

            <button 
                type="button" 
                onClick={onClick}
                className={isNew ? 'button-add' : 'button-delete'}
            >
                {isNew ? <FiPlus/> : <FiX />}
            </button>
        </Container>
    )
}