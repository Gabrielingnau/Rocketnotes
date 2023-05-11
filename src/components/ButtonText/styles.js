import styled from "styled-components";

export const Container = styled.button`
  border: none;
  background: none;
  color: ${({ theme, isActive }) => isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};
  font-size: 16px;
`;