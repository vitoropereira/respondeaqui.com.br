import { Intro } from "./styles";
import LockIcon from '@mui/icons-material/Lock';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export function ChatIntro() {
  return (
    <Intro>
      <i><WhatsAppIcon style={{color: "#4ADF83", fontSize: "250px"}}/></i>
      <h1>WhatsApp Web</h1>

      <h2>
        Envie e receba mensagens sem precisar manter seu celular conectado à internet.   <br/>
        Use o WhatsApp em até quatro aparelhos conectados e um celular ao mesmo tempo.
      </h2>

      <span><LockIcon  style={{fontSize: "18px"}}/> Protegido com a criptografia de ponta a ponta</span>
    </Intro>  
  )
}