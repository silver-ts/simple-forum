import styled from 'styled-components'

export default styled.div`
  ${({ theme }) =>
    theme.name === 'dark'
      ? `
      background-image: linear-gradient(
    -90deg,
    #232627 0%,
    #1c1e1f 50%,
    #232627 100%
  );
  `
      : `
  background-image: linear-gradient(
    -90deg,
    #aeb4b6 0%,
    #e3e3e3 50%,
    #aeb4b6 100%
  );
  `}

  background-size: 400% 400%;
  animation: shimmer 1.2s ease-in-out infinite;

  @keyframes shimmer {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`
