import { useEffect, useState, useRef, useContext } from "react";
import { MessageItem } from "./MessageItem";
import Picker from "@emoji-mart/react";

import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import { ToolTip } from "./Tooltip";
import { AuthUserContext } from "src/context/AuthUserContextProvider";

export interface Question {
  id: string;
  content: string;
  userId: string;
  created_at: Date;
  updated_at: Date;
}

export interface ChatLists {
  id: string;
  content: string;
  questionId: string;
  userId: string;
  created_at: Date;
  updated_at: Date;
  user: User;
  question: Question;
}

interface QuestionLists {
  id: string;
  content: string;
  userId: string;
  created_at: string;
  updated_at: string;
  user: User;
}

interface User {
  id: string;
  username: string;
  email: string;
  signInMethod: string[];
  features: string[];
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
}

interface ChatWindowProps {
  data: QuestionLists;
  mobileOpen: boolean;
  handleWithSetMobileOpen: () => void;
}

export function ChatWindow({
  data,
  mobileOpen,
  handleWithSetMobileOpen,
}: ChatWindowProps) {
  const body = useRef<HTMLDivElement>();
  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition();

  const { currentUser } = useContext(AuthUserContext);

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState("");
  const [listeningAudio, setListeningAudio] = useState(false);
  const [list, setList] = useState<ChatLists[]>();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [globalErrorMessage, setGlobalErrorMessage] = useState(undefined);
  const [errorObject, setErrorObject] = useState(undefined);

  async function getChats(questionId: string) {
    const response = await fetch(`/api/v1/chats/${questionId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const responseBody = await response.json();
    setList(responseBody);
  }

  useEffect(() => {
    getChats(data.id);
  }, [data.id]);

  useEffect(() => {
    if (body.current) {
      if (body.current.scrollHeight > body.current.offsetHeight) {
        body.current.scrollTop =
          body.current.scrollHeight - body.current.offsetHeight;
      }
    }
  }, [list]);

  const handleEmojiClick = (e) => {
    setText(text + e.native);
  };

  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  };

  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  };

  // const handleMicClickStart = () => {
  //   SpeechRecognition.startListening({ continuous: true });
  //   setListeningAudio(listening);
  //   setText(transcript);
  // };

  // const handleMicClickEnd = () => {
  //   SpeechRecognition.stopListening({ continuous: true });
  //   setListeningAudio(listening);
  //   setText(transcript);
  // };

  const handleInputKeyUp = (e) => {
    if (e.keyCode == 13) {
      handleSendClick();
    }
  };

  const handleSendClick = async () => {
    setIsLoading(true);

    if (text === "") {
      return;
    }

    try {
      const chat = {
        content: text,
        userId: currentUser.id,
        questionId: data.id,
        features: currentUser.features,
      };

      const response = await fetch(`/api/v1/chats`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chat),
      });

      setGlobalErrorMessage(undefined);

      const responseBody = await response.json();

      if (response.status === 201) {
        setIsLoading(false);
        setList([...list, responseBody]);
        //TODO: Atualizar question list.
        setText("");
        setEmojiOpen(false);
        return;
      }

      if (response.status === 400) {
        setErrorObject(responseBody);
        setIsLoading(false);
        return;
      }

      if (response.status >= 401) {
        setGlobalErrorMessage(`${responseBody.message} ${responseBody.action}`);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log("error");
      console.log(error);
      setGlobalErrorMessage(
        "Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão."
      );
      setIsLoading(false);
    }
  };

  // const handleBack = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  // const logout = () => {
  //   window.location.reload();
  // };

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser do not support speech recognition.</span>;
  // }

  return (
    <div
      className="flex flex-col h-full overflow-hidden max-[994px]:fixed max-[994px]:top-0 max-[994px]:left-0 max-[994px]:flex-1 max-[994px]:max-w-full max-[994px]:w-screen max-[994px]:h-screen z-10 transition-all ease-in duration-75"
      style={{ display: !mobileOpen ? "none" : "flex" }}
    >
      <header className="h-[60px] flex justify-between items-center px-4 py-0 max-[994px]:w-screen bg-light-backgroundSecond dark:bg-dark-backgroundSecond">
        <div className="flex items-center cursor-pointer">
          <div
            className="hidden max-[994px]:flex max-[994px]:ml-0 max-[994px]:justify-center max-[994px]:items-center max-[994px]:cursor-point max-[994px]:transition-all ease-in"
            // onClick={handleBack}
          >
            <ArrowBackIcon style={{ color: "#919191" }} />
          </div>
          <Image
            className="rounded-full ml-3 mr-2"
            width={40}
            height={40}
            src={data.user.avatar_url}
            alt=""
          />
          <div className="text-base text-light-text dark:text-dark-text pl-2">
            <span className="text-lg font-bold"> Responda a pergunta:</span>{" "}
            {data.content}
          </div>
        </div>
      </header>

      <div
        className="flex-1 overflow-y-auto bg-light-chatBackground dark:bg-dark-chatBackground px-5 py-8 scrollbar"
        ref={body}
      >
        {list &&
          list.map((item) => <MessageItem key={item.id} chatData={item} />)}
      </div>

      <div
        className="h-64 overflow-y-hidden transition-all ease-in bg-light-chatBackground dark:bg-dark-chatBackground"
        style={{ height: emojiOpen ? "250px" : "0px" }}
      >
        <Picker
          title="Escolha seu emoji."
          onEmojiSelect={handleEmojiClick}
          native={true}
          theme="light"
          searchPosition="top"
          size="1em"
          perLine={25}
        />
      </div>

      <footer className="h-[62px] flex gap-[15px] items-center py-0 px-4 max-[994px]:w-screen bg-light-background dark:bg-dark-background">
        <div className="flex">
          <div
            className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleCloseEmoji}
            style={{ display: emojiOpen ? "flex" : "none" }}
          >
            <CloseIcon style={{ color: "#919191" }} />
          </div>

          <div
            className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleOpenEmoji}
            style={{ display: emojiOpen ? "none" : "flex" }}
          >
            <InsertEmoticonIcon style={{ color: "#919191" }} />
          </div>
        </div>
        <div className="flex-1">
          <input
            className="w-full h-10 border-0 outline-0 bg-light-backgroundSecond dark:bg-dark-backgroundSecond text-light-text dark:text-dark-text rounded-[20px] text-base pl-4"
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
        </div>
        <div className="flex">
          {/* {text === "" && (
            <div
              // onClick={handleMicClick}
              className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <MicIcon
                style={{ color: listeningAudio ? "#126ECE" : "#919191" }}
              />
            </div>
          )} */}
          {/* {text !== "" && ( */}
          <div
            onClick={handleSendClick}
            className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <SendIcon style={{ color: "#919191" }} />
          </div>
          {/* )} */}
        </div>
      </footer>
    </div>
  );
}
