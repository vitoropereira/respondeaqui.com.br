import styled from "styled-components";

export const Sidebar = styled.div`
  width: 35%;
  max-width: 415px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.border};

  .chatList{
    flex: 1;  
    background-color: ${(props) => props.theme.background};
    overflow-y: auto;

    @media (max-width: 994px) {
      width: 100vw;
    }
  }

  @media(max-width: 994px) {
    position: fixed;
    width: 100vw;
    height: 100%;
    flex: 1;
    z-index: 1;
    display: ${(props) => props.display};
  }
`

export const HeaderSidebar = styled.header`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  @media (max-width: 994px) {
    width: 100vw;
  }
  
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      cursor: pointer;
    }

    p{
      margin-left: 2px;
      color: ${(props) => props.theme.text};
    }

  }


  .button{
    display: flex;

    .btn {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

`

export const Search = styled.div`
  background: ${(props) => props.theme.background};
  padding: 5px 15px;

  @media (max-width: 994px) {
    width: 100vw;
  }

  .input{
    background-color: ${(props) => props.theme.backgroundSecond};
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 0 10px;

    input{
      flex: 1;
      border: 0;
      outline: 0;
      background-color: transparent;
      margin-left: 10px;
      color: ${(props) => props.theme.text};
    }
  }

`