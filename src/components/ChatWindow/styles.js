import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 994px) {
    position: fixed;
    top: 0;
    left: 0;
    flex: 1;
    max-width: 100%;
    width: 100vw;
    height: 100vh;
    z-index: 3;
    transition: all ease 1s;
  }
`;

export const ChatHeader = styled.header`
  height: 60px;
  border-bottom: 1px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header {
    display: flex;
    align-items: center;
    cursor: pointer;

    .backMobile {
      display: none;
    }

    @media (max-width: 994px) {
      .backMobile {
        display: flex;
        margin-left: 0.5rem;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all ease 1s;
      }
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-left: 0.8rem;
      margin-right: 0.5rem;
    }

    .name {
      font-size: 17px;
      color: ${(props) => props.theme.text};
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    margin-right: 15px;

    .btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;

export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: ${(props) => props.theme.chatBackground};
  padding: 20px 30px;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const ChatEmoji = styled.div`
  height: 260px;
  overflow-y: hidden;
  transition: all ease 0.3s;
  background-color: ${(props) => props.theme.backgroundSecond};
`;

export const ChatFooter = styled.footer`
  height: 62px;
  display: flex;
  gap: 15px;
  align-items: center;
  margin: 0 15px;

  .icons {
    display: flex;
  }

  .input {
    flex: 1;

    input {
      width: 100%;
      height: 40px;
      border: 0;
      outline: 0;
      background-color: ${(props) => props.theme.backgroundSecond};
      color: ${(props) => props.theme.text};
      border-radius: 20px;
      font-size: 15px;
      padding-left: 15px;
    }
  }

  .buttons {
    display: flex;
  }
`;
