import { useSession } from 'next-auth/react'
import { ArrowBendLeftUp, ArrowBendRightUp } from 'phosphor-react'
import { useState, useEffect } from 'react'
import { UpdateUserProps } from 'src/@types/userTypes'
import ChatIcon from '@mui/icons-material/Chat'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { Loading } from './Loading'
import { ShowErrors } from './ShowErrors'
import { SafeUser } from '../@types/next-auth'

type Props = {
  tutorialSteps: number
  handleMakeTutorial: (tutorialSteps: number) => void
  currentUser: SafeUser
}

export function Tutorial({
  tutorialSteps,
  handleMakeTutorial,
  currentUser,
}: Props) {
  const [globalErrorMessage, setGlobalErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [makingTutorial, setMakingTutorial] = useState(tutorialSteps)

  const [width, setWidth] = useState(0)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth)

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  async function handleTutorial() {
    setIsLoading(true)

    try {
      const userData: UpdateUserProps = {
        tutorial_steps: 1,
      }

      const response = await fetch(`/api/v1/user/${currentUser.id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      setGlobalErrorMessage('')

      const responseBody = await response.json()

      if (response.status === 200) {
        handleMakeTutorial(responseBody.tutorial_steps)
        setMakingTutorial(responseBody.tutorial_steps)
        setIsLoading(false)
      }

      if (response.status === 400) {
        setGlobalErrorMessage(responseBody)
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

  useEffect(() => {
    handleMakeTutorial(currentUser.tutorial_steps)
  }, [currentUser.tutorial_steps, handleMakeTutorial])

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-30 flex flex-col items-center justify-center bg-gray-500 opacity-80">
      {isLoading && <Loading size={10} />}
      {!isLoading && makingTutorial === 0 && (
        <>
          {width < 993 && (
            <ChatIcon
              className="ml-[250px] mt-3 font-bold"
              style={{ color: '#001', width: 50, height: 50 }}
            />
          )}
          {width > 993 && (
            <ChatIcon
              className="ml-[-700px] mt-3 font-bold"
              style={{ color: '#001', width: 50, height: 50 }}
            />
          )}
          <div
            className="ml-[650px] mt-[30px] flex h-full w-full 
                      items-start justify-start
                      opacity-100 max-[994px]:ml-[280px]
                      max-[994px]:mt-[20px]"
          >
            {width > 993 && <ArrowBendLeftUp size={32} color="#1d2daa" />}
            <div className="flex flex-col items-start justify-start">
              <p className="mt-3 text-2xl">Crie seu chat aqui!</p>
              <button
                className="ms-3 mt-3 rounded-lg bg-brand-500  
                px-2 py-1 
                text-center text-base 
                font-semibold text-dark-text  
                shadow-md transition duration-200 ease-in hover:bg-brand-400 focus:outline-none dark:bg-light-chatBackground 
                dark:text-light-text 
                dark:hover:bg-light-backgroundHover "
                onClick={handleTutorial}
                disabled={isLoading}
              >
                Ok obrigado! 😁👌
              </button>
            </div>
            {width < 993 && <ArrowBendRightUp size={32} color="#1d2daa" />}
          </div>
        </>
      )}
      {!isLoading && makingTutorial === 1 && (
        <>
          {width > 993 && (
            <DarkModeIcon
              className="ml-[-750px] mt-3 font-bold"
              style={{ color: '#001', width: 50, height: 50 }}
            />
          )}
          {width < 993 && (
            <DarkModeIcon
              className="ml-[200px] mt-3 font-bold"
              style={{ color: '#001', width: 50, height: 50 }}
            />
          )}
          <div
            className="ml-[600px] mt-[10px] flex h-full w-full 
              items-start justify-start
              opacity-100 max-[994px]:ml-[80px]
              max-[994px]:mt-[20px]"
          >
            {width > 993 && <ArrowBendLeftUp size={32} color="#1d2daa" />}
            <div className="flex flex-col items-start justify-start">
              <p className="mt-3 w-[250px] text-2xl">
                Aqui você consegue ajustar o tema.
                <br /> 🌙 🌞
              </p>
              <button
                className="ms-3 mt-3 rounded-lg bg-brand-500  
                px-2 py-1 
                text-center text-base 
                font-semibold text-dark-text  
                shadow-md transition duration-200 ease-in hover:bg-brand-400 focus:outline-none dark:bg-light-chatBackground 
                dark:text-light-text 
                dark:hover:bg-light-backgroundHover "
                onClick={handleTutorial}
                disabled={isLoading}
              >
                Assim ficou ótimo! Obrigado! 😁
              </button>
            </div>
            {width < 993 && <ArrowBendRightUp size={32} color="#1d2daa" />}
          </div>
        </>
      )}
      {globalErrorMessage && <ShowErrors message={globalErrorMessage} />}
    </div>
  )
}
