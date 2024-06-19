import styled from 'styled-components';

export const Container = styled.button.attrs(({ isActive }) => ({
  isActive,
}))`
  background: none;
  color: ${({ theme, isActive }) => (isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100)};
  border: none;
  font-size: 16px;
`;

