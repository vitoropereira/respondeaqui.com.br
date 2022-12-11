import { Chats, GithubLogo, GoogleLogo, Moon, SunDim } from 'phosphor-react';
import {FirebaseLoginRepository} from 'src/repositories/firebase/firebase-login'
import {FirebaseUserRepository} from 'src/repositories/firebase/firebase-user'
import { useContext, useEffect, useState } from 'react';
import {AuthUserContext} from '../../context/AuthUserContextProvider'
import { useRouter } from 'next/router';

export default function Login() {
  const [darkMode, setDarkMode] = useState(true)
  
  const user = useContext(AuthUserContext)
  const router = useRouter()


  const loginFirebase = new FirebaseLoginRepository()
  const userFirebase = new FirebaseUserRepository()


  const handleGoogleLogin = async () => {
    let result = await loginFirebase.googlePopup()
    if (result) {
      const newUser = {
        id: result.user.multiFactor.user.uid,
        name: result.user.multiFactor.user.displayName,
        avatar: result.user.multiFactor.user.photoURL
      }

      await userFirebase.addUser(newUser)
    } else {
      alert('Erro!')
    }
  }

  const handleGithubLogin = async () => {
    let result = await loginFirebase.githubPopup()
    if (result) {
      const newUser = {
        id: result.user.multiFactor.user.uid,
        name: result.user.multiFactor.user.displayName,
        avatar: result.user.multiFactor.user.photoURL
      }

      await userFirebase.addUser(newUser)
    } else {
      alert('Erro!')
    }
  }

  useEffect(()=>{
    if(user){
      router.push('../')
    }
  }, [router, user])

  return (
  <div className={`${darkMode && 'dark'}`}>
    <div className={`h-screen w-screen flex items-center justify-center pt-4 bg-white dark:bg-[#000]` }>
      <div className='flex flex-col items-center justify-center'>
       <button onClick={() => setDarkMode(!darkMode)} className="absolute top-3 right-3 flex items-center p-4  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none bg-white dark:bg-[#000]">
          {darkMode ? (<Moon size={32} color='#000' />):(<SunDim size={32} color="#ffc222" />)}
        </button>
        <div className='flex justify-center items-center'>
        <i>
          <Chats  size={80} color='#4ADF83' />
        </i>
        <h1 className='text-5xl font-semibold text-green-400 md:text-4xl'>Responde aqui!</h1>
        </div>

        <p className='font-medium text-xl dark:text-white text-black'>Faça login para continuar</p>
        <button 
        className='border-none rounded-xl mt-3 cursor-pointer w-80 h-16 flex justify-center items-center gap-3 bg-red-600 hover:bg-red-800 md:w-72 md:h-16'
         onClick={handleGoogleLogin}
         >
         <GoogleLogo color='#fff' size={32} />
         <span className='text-xl font-semibold text-white'>Entrar com Google</span>
        </button>
        <button 
        className='border-none rounded-xl mt-3 cursor-pointer w-80 h-16 flex justify-center items-center gap-3 bg-gray-600 hover:bg-gray-800 md:w-72 md:h-16'
        onClick={handleGithubLogin}
        >
          <GithubLogo color='#fff' size={32}/>
          <span>Entrar com Github</span>
        </button>
      </div>

    </div>
</div>

  )
}
