import styled from 'styled-components'

export const Chat = styled.div`
  width: 35%;
  max-width: 415px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.background};
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.border};
  transition: all ease 0.5s;

  @media(max-width: 994px ) {
    position: fixed;
    width: 100%;
    height: 100%;
    flex: 1;
    z-index: 2;
    display: ${(props) => props.display};
  }
  
  .header {
    display: flex;
    background-color: #00bfa5;
    align-items: center;
    padding: 60px 15px 15px 15px;

    .button {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    h2 {
      font-size: 19px;
      height: 40px;
      line-height: 40px;
      flex: 1;
      font-weight: bold;
      color: #fff;
      margin-left: 20px;
    }
  }

  .list {
    flex: 1;
    overflow-y: auto;

    .new-chat{
      display: flex;
      align-items: center; 
      padding: 15px;
      cursor: pointer;

      &:hover{
        background-color: ${(props) => props.theme.backgroundHover};
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 15px;
      }
      
      .name{
        font-size: 17px;
        color: ${(props) => props.theme.text};
      }
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`
