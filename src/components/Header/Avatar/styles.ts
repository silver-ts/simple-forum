import styled from 'styled-components'

export const Avatar = styled.div`
  background: ${({ theme }) => theme.colors.social.instagram};
  width: 55px;
  height: 55px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms ease-in-out;

  &:hover {
    filter: opacity(0.8);
  }
`
