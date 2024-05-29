import styled from 'styled-components';

export const Container = styled.button`
    background: none;
    // Foi aplicado uma condição para cor, Se estiver ativo coloque a cor Laranja senão a cor Cinza.
    color: ${({ theme, isActive }) => isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};

    border: none;
    font-size: 16;
`;