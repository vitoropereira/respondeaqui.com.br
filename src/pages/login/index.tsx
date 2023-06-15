import { Chats, GithubLogo, GoogleLogo } from 'phosphor-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loading } from 'src/components/Loading'

import { signIn, useSession } from 'next-auth/react'
import Home from '..'

export default function Login() {
  return <Home />
  // const [darkMode, setDarkMode] = useState(true)
  // const [isLoading, setIsLoading] = useState(false)
  // const [errorObject, setErrorObject] = useState(undefined)

  // const session = useSession()
  // const router = useRouter()

  // const hasAuthError = !!router.query.error
  // const isSignedIn = session.status == 'authenticated'

  // const handleGoogleLogin = async () => {
  //   setIsLoading(true)
  //   await signIn('google')
  // }

  // useEffect(() => {
  //   if (isSignedIn) {
  //     router.push('../chats')
  //   }
  // }, [isSignedIn, router])

  // // const handleGithubLogin = async () => {
  // //   let result = await loginFirebase.githubPopup();
  // //   if (result) {
  // //     const newUser = {
  // //       id: result.user.multiFactor.user.uid,
  // //       name: result.user.multiFactor.user.displayName,
  // //       avatar: result.user.multiFactor.user.photoURL,
  // //     };

  // //     await userFirebase.addUser(newUser);

  // //     router.push("./chats");
  // //   } else {
  // //     alert("Erro!");
  // //   }
  // // };

  // // if (currentUser) {
  // //   router.push("./chats");
  // // }

  // return (
  //   <div className={`${darkMode && 'dark'}`}>
  //     <div
  //       className={`pt-4bg-light-backgroundSecond flex h-screen w-screen items-center justify-center dark:bg-dark-backgroundSecond`}
  //     >
  //       <div className="flex flex-col items-center justify-center">
  //         <div className="flex items-center justify-center">
  //           <Chats className="text-brand-500" style={{ fontSize: '80px' }} />
  //           <h1 className="mt-4 text-center text-3xl font-semibold text-light-lastMessage dark:text-dark-lastMessage">
  //             Responde aqui!
  //           </h1>
  //         </div>

  //         <p className="mt-32 text-xl font-medium text-black dark:text-white">
  //           Faça login para continuar
  //         </p>
  //         {isLoading ? (
  //           <Loading size={10} />
  //         ) : (
  //           <>
  //             <button
  //               className="mt-4 flex h-16 w-80 cursor-pointer items-center justify-center gap-3 rounded-xl border-none bg-red-600 hover:bg-red-800 md:h-16 md:w-72"
  //               onClick={handleGoogleLogin}
  //               disabled={isSignedIn}
  //             >
  //               <GoogleLogo color="#fff" size={32} />
  //               <span className="text-xl font-semibold text-white">
  //                 Entrar com Google
  //               </span>
  //             </button>
  //             {hasAuthError && (
  //               <span className="text-red-600">
  //                 Falha ao conectar ao Google, verifique se as permissões.
  //               </span>
  //             )}
  //             {/* <button
  //               className="border-none rounded-xl mt-3 cursor-pointer w-80 h-16 flex justify-center items-center gap-3 bg-gray-600 hover:bg-gray-800 md:w-72 md:h-16"
  //               onClick={handleGithubLogin}
  //             >
  //               <GithubLogo color="#fff" size={32} />
  //               <span>Entrar com Github</span>
  //             </button> */}
  //           </>
  //         )}

  //         {errorObject && (
  //           <h1 className="text-xl font-medium text-black dark:text-white">
  //             {errorObject.message}
  //           </h1>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // )
}
