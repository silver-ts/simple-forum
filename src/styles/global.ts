import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
:root {
  --toastify-color-info: #C13584;

}
 
  * { 
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      transition: background-color 700ms ease; 

    }
  
  body {
    -webkit-font-smoothing: antialiased;


    &::-webkit-scrollbar {
      background-color: ${({ theme }) =>
        theme.name === 'dark' && theme.colors.system.tertiary};
  }

  &::-webkit-scrollbar-thumb{
    background-color: ${({ theme }) => theme.name === 'dark' && '#888'};

  }

  background: ${({ theme }) => theme.colors.system.primary};

  }

  html {
      @media (max-width: 1080px){
        font-size: 93.75%; //15px
      }
      @media (max-width: 720px) {
        font-size: 87.5%; //14px
      }
    }
  button {
    cursor: pointer;
  }
`
