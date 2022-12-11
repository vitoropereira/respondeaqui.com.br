import styled from 'styled-components'

export const Message = styled.div`
  margin-bottom: 10px;
  display: flex;
`

export const Item = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 3px;
  max-width: 90%;

  .messageText{
    font-size: 14px;
    margin: 5px 40px 5px 5px;
  }

  .messageDate{
    font-size: 11px;
    color: #999;
    margin-right: 5px;
    text-align: right;
    height: 15px;
    margin-top: -15px;
  }
`
