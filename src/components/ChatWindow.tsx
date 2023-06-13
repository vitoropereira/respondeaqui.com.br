import { useEffect, useState, useRef, useContext } from 'react'
import { MessageItem } from './MessageItem'
import Picker from '@emoji-mart/react'
import useSWR from 'swr'

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { MessageProps } from 'src/@types/messageTypes'
import { ChatProps } from 'src/@types/chatType'

interface ChatWindowProps {
  chatData: ChatProps
  mobileOpen: boolean
  handleWithSetMobileOpen: () => void
}

export function ChatWindow({
  chatData,
  mobileOpen,
  handleWithSetMobileOpen,
}: ChatWindowProps) {
  const body = useRef<HTMLDivElement>()
  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition();
  const session = useSession()

  const [emojiOpen, setEmojiOpen] = useState(false)
  const [text, setText] = useState('')
  const [messageList, setMessageList] = useState<MessageProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [globalErrorMessage, setGlobalErrorMessage] = useState('')
  const [errorObject, setErrorObject] = useState('')
  const [sendTExt, setSendTExt] = useState(true)

  const [listeningAudio, setListeningAudio] = useState(false)
  const [users, setUsers] = useState([])

  const { data, error } = useSWR<MessageProps[]>(
    `/api/v1/messages/${chatData.id}`,
    {
      refreshInterval: 100,
    },
  )

  useEffect(() => {
    if (!error && data) {
      setMessageList(data)
    }
  }, [data, error])

  useEffect(() => {
    if (body.current) {
      if (body.current.scrollHeight > body.current.offsetHeight) {
        body.current.scrollTop =
          body.current.scrollHeight - body.current.offsetHeight
      }
    }
  }, [messageList])

  const handleEmojiClick = (e) => {
    setText(text + e.native)
  }

  const handleOpenEmoji = () => {
    setEmojiOpen(true)
  }

  const handleCloseEmoji = () => {
    setEmojiOpen(false)
  }

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
      setSendTExt(false)
      setErrorObject('Você digitou o máximo de 2000 caracteres.')
      return
    }
    setSendTExt(true)
    setErrorObject('')
    if (e.keyCode === 13) {
      handleSendClick()
    }
  }

  const handleSendClick = async () => {
    setIsLoading(true)

    if (text === '') {
      return
    }

    try {
      if (!session.data || (session.data && !session.data.user)) {
        throw new Error('Usuário não esta logado! ')
      }

      const message: MessageProps = {
        content: text,
        user_id: session.data.user.id,
        chat_id: chatData.id,
        content_type: 'text',
      }

      const response = await fetch(`/api/v1/messages`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })

      setGlobalErrorMessage('')

      const responseBody = await response.json()

      if (response.status === 201) {
        setIsLoading(false)
        console.log('responseBody')
        console.log(responseBody)
        setMessageList([...messageList, responseBody])

        setText('')
        setEmojiOpen(false)

        return
      }

      if (response.status === 400) {
        setErrorObject(responseBody)
        setIsLoading(false)
        return
      }

      if (response.status >= 401) {
        setGlobalErrorMessage(`${responseBody.message} ${responseBody.action}`)
        setIsLoading(false)
        return
      }
    } catch (error) {
      setGlobalErrorMessage(
        'Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão.',
      )
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    handleWithSetMobileOpen()
  }

  // const logout = () => {
  //   window.location.reload();
  // };

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser do not support speech recognition.</span>;
  // }

  return (
    <div
      className={`${!mobileOpen ? 'hidden' : 'flex'} z-10 h-full flex-col 
      overflow-hidden transition-all duration-75 ease-in 
      max-[994px]:fixed max-[994px]:left-0 max-[994px]:top-0 
      max-[994px]:h-screen max-[994px]:w-full max-[994px]:flex-1`}
    >
      <header
        className="flex h-[60px] items-center justify-between bg-light-backgroundSecond px-4 
        py-0 dark:bg-dark-backgroundSecond max-[994px]:w-full"
      >
        <div className="flex cursor-pointer items-center">
          <div
            className="max-[994px]:cursor-point hidden ease-in max-[994px]:ml-0 max-[994px]:flex 
            max-[994px]:items-center max-[994px]:justify-center max-[994px]:transition-all"
            onClick={handleBack}
          >
            <ArrowBackIcon style={{ color: '#919191' }} />
          </div>
          {chatData.user.image && (
            <Image
              className="ml-3 mr-2 rounded-full"
              width={40}
              height={40}
              src={chatData.user.image}
              alt="Imagem do usuário."
            />
          )}

          <div className="pl-2 text-base text-light-text dark:text-dark-text">
            <span className="text-lg font-bold"> Tema do chat:</span>{' '}
            {chatData.content}
          </div>
        </div>
      </header>

      <div
        className="flex-1 overflow-y-auto bg-light-chatBackground px-5 py-8 scrollbar dark:bg-dark-chatBackground"
        // ref={body}
      >
        {messageList &&
          messageList.map((item) => (
            <MessageItem key={item.id} messageData={item} />
          ))}

        {globalErrorMessage && (
          <p className="text-ellipsis text-sm font-medium text-red-500">
            {globalErrorMessage}
          </p>
        )}
        {errorObject && (
          <p className="text-sm font-medium text-red-500">{errorObject}</p>
        )}
      </div>

      <div
        className="h-64 bg-light-chatBackground transition-all ease-in overflow-y-hidden dark:bg-dark-chatBackground"
        style={{ height: emojiOpen ? '250px' : '0px' }}
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
        <div className="bg-light-chatBackground pl-3 dark:bg-dark-chatBackground">
          <p className="text-sm font-medium text-red-500">{errorObject}</p>
        </div>
      )}
      <footer className="flex h-[62px] items-center gap-[15px] bg-light-background px-4 py-0 dark:bg-dark-background max-[994px]:w-full">
        <div className="flex">
          <div
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            onClick={handleCloseEmoji}
            style={{ display: emojiOpen ? 'flex' : 'none' }}
          >
            <CloseIcon style={{ color: '#919191' }} />
          </div>

          <div
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            onClick={handleOpenEmoji}
            style={{ display: emojiOpen ? 'none' : 'flex' }}
          >
            <InsertEmoticonIcon style={{ color: '#919191' }} />
          </div>
        </div>
        <div className="flex-1">
          <input
            className="h-10 w-full rounded-[20px] border-0 bg-light-backgroundSecond pl-4 text-base text-light-text outline-0 dark:bg-dark-backgroundSecond dark:text-dark-text"
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
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            >
              <SendIcon style={{ color: '#919191' }} />
            </div>
          )}
          {/* )} */}
        </div>
      </footer>
    </div>
  )
}
