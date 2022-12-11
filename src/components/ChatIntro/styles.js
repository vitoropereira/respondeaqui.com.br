import styled from "styled-components";

export const Intro = styled.div`
 display: flex;
 flex-direction: column;
 background-color: ${(props) => props.theme.backgroundSecond};
 justify-content: center;
 align-items: center;
 height: 100vh;
 border-bottom: 7px solid #4ADF83;
 display: flex;


 @media (max-width: 994px) {
  display: none;
 }

 h1 {
  font-size: 32px;
  color: ${(props) => props.theme.lastMessage};
  font-weight: 600;
  margin-top: 1.5rem;
  text-align: center;
 }

 h2 {
  font-size: 14px;
  font-weight: normal;
  margin-top: 1.2rem;
  line-height: 20px;
  text-align: center;
  color: ${(props) => props.theme.textSecondary};
 }
  
 span{
  color: ${(props) => props.theme.textSecondary};
  position: fixed;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
 }
 
`