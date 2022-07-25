import styled from 'styled-components'
import { MdOutlineDelete, MdOutlineModeEditOutline } from 'react-icons/md'

export const PostText = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h1 {
    @media (max-width: 600px) {
      font-size: 2rem;
    }
  }
`

export const PostDates = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const PostBodyContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`

export const DeleteIcon = styled(MdOutlineDelete).attrs({
  color: 'white',
  size: 20
})``

export const EditIcon = styled(MdOutlineModeEditOutline).attrs({
  color: 'white',
  size: 20
})``

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ButtonContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
