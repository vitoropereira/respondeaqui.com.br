import { useEffect, useState, useRef, useContext } from "react";
import { MessageItem } from "./MessageItem";
import Picker from "@emoji-mart/react";
import useSWR from "swr";

import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MessageProps } from "src/@types/messageTypes";
import { ChatProps } from "src/@types/chatType";

interface ChatWindowProps {
  chatData: ChatProps;
  mobileOpen: boolean;
  handleWithSetMobileOpen: () => void;
}

export function ChatWindow({
  chatData,
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
  const session = useSession();

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState("");
  const [listeningAudio, setListeningAudio] = useState(false);
  const [messageList, setMessageList] = useState<MessageProps[]>();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [globalErrorMessage, setGlobalErrorMessage] = useState(undefined);
  const [errorObject, setErrorObject] = useState(undefined);
  const [sendTExt, setSendTExt] = useState(true);

  const { data, error } = useSWR<MessageProps[]>(
    `/api/v1/messages/${chatData.id}`,
    {
      refreshInterval: 100,
    }
  );

  console.log("data");
  console.log(data);

  useEffect(() => {
    if (!error) {
      setMessageList(data);
    }
  }, [data, error]);

  useEffect(() => {
    if (body.current) {
      if (body.current.scrollHeight > body.current.offsetHeight) {
        body.current.scrollTop =
          body.current.scrollHeight - body.current.offsetHeight;
      }
    }
  }, [messageList]);

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
    if (text.length > 2000) {
      setSendTExt(false);
      setErrorObject("Você digitou o máximo de 2000 caracteres.");
      return;
    }
    setSendTExt(true);
    setErrorObject(undefined);
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
      const message: MessageProps = {
        content: text,
        user_id: session.data.user.id,
        chat_id: chatData.id,
        content_type: "text",
      };

      const response = await fetch(`/api/v1/messages`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      setGlobalErrorMessage(undefined);

      const responseBody = await response.json();

      if (response.status === 201) {
        setIsLoading(false);
        console.log("responseBody");
        console.log(responseBody);
        setMessageList([...messageList, responseBody]);

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
      setGlobalErrorMessage(
        "Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão."
      );
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    handleWithSetMobileOpen();
  };

  // const logout = () => {
  //   window.location.reload();
  // };

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser do not support speech recognition.</span>;
  // }

  return (
    <div
      className="flex flex-col h-full overflow-hidden 
      max-[994px]:fixed max-[994px]:top-0 max-[994px]:left-0 max-[994px]:flex-1 
      max-[994px]:w-full max-[994px]:h-screen z-10 
      transition-all ease-in duration-75"
      style={{ display: !mobileOpen ? "none" : "flex" }}
    >
      <header
        className="h-[60px] flex justify-between items-center px-4 py-0 
        max-[994px]:w-full bg-light-backgroundSecond dark:bg-dark-backgroundSecond"
      >
        <div className="flex items-center cursor-pointer">
          <div
            className="hidden max-[994px]:flex max-[994px]:ml-0 max-[994px]:justify-center max-[994px]:items-center 
            max-[994px]:cursor-point max-[994px]:transition-all ease-in"
            onClick={handleBack}
          >
            <ArrowBackIcon style={{ color: "#919191" }} />
          </div>
          <Image
            className="rounded-full ml-3 mr-2"
            width={40}
            height={40}
            src={chatData.user.avatar_url}
            alt=""
          />
          <div className="text-base text-light-text dark:text-dark-text pl-2">
            <span className="text-lg font-bold"> Tema do chat:</span>{" "}
            {chatData.content}
          </div>
        </div>
      </header>

      <div
        className="flex-1 overflow-y-auto bg-light-chatBackground dark:bg-dark-chatBackground px-5 py-8 scrollbar"
        ref={body}
      >
        {messageList &&
          messageList.map((item) => (
            <MessageItem key={item.id} messageData={item} />
          ))}

        {globalErrorMessage && (
          <p className="font-medium text-sm text-red-500 text-ellipsis">
            {globalErrorMessage}
          </p>
        )}
        {errorObject && (
          <p className="font-medium text-sm text-red-500">
            {errorObject.message}
          </p>
        )}
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
      {errorObject && (
        <div className="pl-3 bg-light-chatBackground dark:bg-dark-chatBackground">
          <p className="font-medium text-sm text-red-500">{errorObject}</p>
        </div>
      )}
      <footer className="h-[62px] flex gap-[15px] items-center py-0 px-4 max-[994px]:w-full bg-light-background dark:bg-dark-background">
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
          {sendTExt && (
            <div
              onClick={handleSendClick}
              className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <SendIcon style={{ color: "#919191" }} />
            </div>
          )}
          {/* )} */}
        </div>
      </footer>
    </div>
  );
}
