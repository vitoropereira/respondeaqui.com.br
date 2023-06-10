'use client'

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { SafeUser } from 'app/@types/userTypes'
import ChatIcon from '@mui/icons-material/Chat'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Loading from '@/app/loading'
import { ShowErrors } from '../ShowErrors'

type Props = {
  tutorialSteps: number
  currentUser: SafeUser
}

export default function Tutorial({ tutorialSteps, currentUser }: Props) {
  const [globalErrorMessage, setGlobalErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [makingTutorial, setMakingTutorial] = useState(tutorialSteps)

  const [width, setWidth] = useState<number | undefined>(undefined)

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
      if (!currentUser) {
        throw new Error('Usuário não esta logado.')
      }

      const userData = {
        tutorialSteps: 1,
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
      console.log('error')
      console.log(error)
      setGlobalErrorMessage(
        'Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão.',
      )
      setTimeout(() => setGlobalErrorMessage(''), 5000)
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-30 flex flex-col items-center justify-center bg-gray-500 opacity-80">
      {isLoading && <Loading />}
      {!isLoading && makingTutorial === 0 && (
        <>
          {width && width < 993 && (
            <ChatIcon
              className="ml-[250px] mt-3 font-bold"
              style={{ color: '#001', width: 50, height: 50 }}
            />
          )}
          {width && width >= 993 && (
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
            {width && width >= 993 && (
              <FaArrowAltCircleLeft size={32} color="#1d2daa" />
            )}
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
            {width && width < 993 && (
              <FaArrowAltCircleRight size={32} color="#1d2daa" />
            )}
          </div>
        </>
      )}
      {!isLoading && makingTutorial === 1 && (
        <>
          {width && width >= 993 && (
            <DarkModeIcon
              className="ml-[-750px] mt-3 font-bold"
              style={{ color: '#001', width: 50, height: 50 }}
            />
          )}
          {width && width < 993 && (
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
            {width && width >= 993 && (
              <FaArrowAltCircleLeft size={32} color="#1d2daa" />
            )}
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
            {width && width < 993 && (
              <FaArrowAltCircleRight size={32} color="#1d2daa" />
            )}
          </div>
        </>
      )}
      {globalErrorMessage && <ShowErrors message={globalErrorMessage} />}
    </div>
  )
}
