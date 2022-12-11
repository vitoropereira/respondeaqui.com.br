import { useEffect, useState, useRef } from "react";
import { MessageItem } from "../MessageItem";
import Picker from "@emoji-mart/react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import LogoutIcon from "@mui/icons-material/Logout";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";

export function ChatWindow({ user, data, mobileOpen, setMobileOpen }) {
  const body = useRef();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState("");
  const [listeningAudio, setListeningAudio] = useState(false);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   setList([])
  //   let unsub = Api.onChatContent(data.chatId, setList, setUsers)
  //   return unsub
  // }, [data.chatId])

  // useEffect(() => {
  //   if (body.current.scrollHeight > body.current.offsetHeight) {
  //     body.current.scrollTop =
  //       body.current.scrollHeight - body.current.offsetHeight;
  //   }
  // }, [list]);

  // const handleEmojiClick = (e) => {
  //   setText(text + e.native);
  // };

  // const handleOpenEmoji = () => {
  //   setEmojiOpen(true);
  // };

  // const handleCloseEmoji = () => {
  //   setEmojiOpen(false);
  // };

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

  // const handleInputKeyUp = (e) => {
  //   if (e.keyCode == 13) {
  //     handleSendClick();
  //   }
  // };

  // const handleSendClick = () => {
  //   if (text !== "") {
  //     Api.sendMessage(data, user.id, "text", text, users);
  //     setText("");
  //     setEmojiOpen(false);
  //   }
  // };

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
      className="flex flex-col h-full max-md:fixed max-md:top-0 max-md:left-0 max-md:flex-1 max-md:max-w-full max-md:w-screen max-md:h-screen z-10 transition-all ease-in "
      style={{ display: !mobileOpen ? "none" : "flex" }}
    >
      <header className="h-[60px] border-b-light-border dark:border-b-dark-border flex justify-center items-center">
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
            src={data.image}
            alt=""
          />
          <div className="text-base text-light-text dark:text-dark-text">
            {data.title}
          </div>
        </div>

        <div className="flex items-center mr-4">
          <div
            className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            // onClick={logout}
          >
            <LogoutIcon style={{ color: "#919191" }} />
          </div>
        </div>
      </header>

      <div
        className="flex-1 overflow-y-auto bg-light-chatBackground dark:bg-dark-chatBackground px-5 py-8 scrollbar"
        ref={body}
      >
        {list?.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
      </div>

      <div
        className="h-64 overflow-y-hidden transition-all ease-in bg-light-backgroundSecond dark:bg-dark-backgroundSecond"
        style={{ height: emojiOpen ? "250px" : "0px" }}
      >
        <Picker
          title="Pick your emoji…"
          // onEmojiSelect={handleEmojiClick}
          native={true}
          theme="light"
          skinTonePositions="none"
          searchPosition="none"
          size="1.5em"
          perLine={20}
        />
      </div>

      <footer className="h-16 flex gap-4 items-center px-0 py-4">
        <div className="flex">
          <div
            className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            // onClick={handleCloseEmoji}
            style={{ display: emojiOpen ? "block" : "none" }}
          >
            <CloseIcon style={{ color: "#919191" }} />
          </div>

          <div
            className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            // onClick={handleOpenEmoji}
            style={{ display: emojiOpen ? "none" : "block" }}
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
            // onKeyUp={handleInputKeyUp}
          />
        </div>
        <div className="flex">
          {text === "" && (
            <div
              // onClick={handleMicClick}
              className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <MicIcon
                style={{ color: listeningAudio ? "#126ECE" : "#919191" }}
              />
            </div>
          )}
          {text !== "" && (
            <div
              // onClick={handleSendClick}
              className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <SendIcon style={{ color: "#919191" }} />
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
