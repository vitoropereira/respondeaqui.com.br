'use client'

import { FaGoogle, FaComments } from 'react-icons/fa'
import useLoginModal from './hooks/useLoginModal'

export default function Home() {
  const loginModal = useLoginModal()

  const handleLogin = () => {
    console.log('entrei')
    loginModal.onOpen()
  }

  return (
    <div className="flex h-screen w-full items-center justify-between bg-gradient-to-r from-blue-500 p-4 text-zinc-100 overflow-y-hidden">
      {/* <FaComments className="absolute -z-10 -mt-10 ml-28 -rotate-12 text-[560px] font-thin text-white opacity-20 overflow-y-hidden max-[768px]:hidden" /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 256 256"
        className="absolute -z-10 -mt-10 ml-28 -rotate-12 text-[560px] font-thin text-white opacity-20 overflow-y-hidden max-[768px]:hidden"
      >
        <rect width="256" height="256" fill="none"></rect>
        <path
          d="M71.6,144,32,176V48a8,8,0,0,1,8-8H168a8,8,0,0,1,8,8v88a8,8,0,0,1-8,8Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></path>
        <path
          d="M80,144v40a8,8,0,0,0,8,8h96.4L224,224V96a8,8,0,0,0-8-8H176"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></path>
      </svg>
      {/* {styles.content} */}
      <div className="w-[50%} ml-[55%] grid max-[768px]:m-0 max-[768px]:w-full">
        <div className="flex h-32 items-center justify-center">
          <FaComments className="mr-3" style={{ fontSize: '80px' }} />
          <h1 className="mt-4 text-center text-3xl font-semibold">
            Responde aqui!
          </h1>
        </div>
        <strong className="mb-8 mr-0">Bem-vindo</strong>

        {/* {styles.title} */}
        <div className="z-10 mb-4 flex">
          <span className="mb-4 max-w-[220px] text-base font-medium">
            Faça login ou crie uma conta para começar o bate-papo!
          </span>
        </div>

        <div className="flex max-w-[350px] justify-between rounded-md p-2">
          <button
            className="flex h-16 w-80 cursor-pointer items-center justify-center gap-3 rounded-xl border-none bg-red-600 hover:bg-red-800 md:h-16 md:w-72"
            onClick={handleLogin}
          >
            <span className="text-xl font-semibold text-white">
              Fazer login
            </span>
          </button>
          {/* {hasAuthError && (
              <span className="text-red-600">
                Falha ao conectar ao Google, verifique se as permissões.
              </span>
            )} */}
        </div>

        <span className="mt-10 max-w-[400px] text-lg max-[768px]:text-base">
          Responde aqui é uma plataforma de discussão online onde é possível
          conectar-se com outras pessoas e compartilhar ideias sobre assuntos de
          interesse.
        </span>
      </div>
    </div>
  )
}
