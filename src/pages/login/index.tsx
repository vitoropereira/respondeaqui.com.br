import { Chats, GithubLogo, GoogleLogo, Moon, SunDim } from "phosphor-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Loading } from "src/components/Loading";
import { useAuthUser } from "src/context/AuthUserContextProvider";

import { FirebaseLoginRepository } from "../../repositories/firebase/firebase-login";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const [darkMode, setDarkMode] = useState(true);
  const [globalErrorMessage, setGlobalErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [errorObject, setErrorObject] = useState(undefined);

  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status == "authenticated";

  const handleGoogleLogin = async () => {
    console.log("aqui!!!");
    await signIn("google");
    // setIsLoading(true);
    // setErrorObject(undefined);
    // const { user, credential } = await firebaseLoginRepository.googlePopup();
    // const { email, displayName, photoURL } = user;

    // if (user) {
    //   const newUser = {
    //     username: displayName,
    //     avatar_url: photoURL,
    //     email,
    //     signInMethod: credential.signInMethod,
    //     features: ["create:user"],
    //   };

    //   try {
    //     const response = await fetch(`/api/v1/users`, {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(newUser),
    //     });

    //     setGlobalErrorMessage(undefined);

    //     const responseBody = await response.json();

    //     if (response.status === 201) {
    //       fetchUser(newUser.email);
    //       router.push("./dashboard");
    //       return;
    //     }

    //     if (response.status === 400) {
    //       setErrorObject(responseBody);
    //       setIsLoading(false);
    //       return;
    //     }

    //     if (response.status >= 401) {
    //       setGlobalErrorMessage(
    //         `${responseBody.message} ${responseBody.action}`
    //       );
    //       setIsLoading(false);
    //       return;
    //     }
    //   } catch (error) {
    //     console.log("error");
    //     console.log(error);
    //     setGlobalErrorMessage(
    //       "Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão."
    //     );
    //     setIsLoading(false);
    //   }
    // }
  };

  useEffect(() => {
    if (isSignedIn) {
      router.push("../dashboard");
    }
  }, [isSignedIn, router]);

  // const handleGithubLogin = async () => {
  //   let result = await loginFirebase.githubPopup();
  //   if (result) {
  //     const newUser = {
  //       id: result.user.multiFactor.user.uid,
  //       name: result.user.multiFactor.user.displayName,
  //       avatar: result.user.multiFactor.user.photoURL,
  //     };

  //     await userFirebase.addUser(newUser);

  //     router.push("./dashboard");
  //   } else {
  //     alert("Erro!");
  //   }
  // };

  // if (currentUser) {
  //   router.push("./dashboard");
  // }

  return (
    <div className={`${darkMode && "dark"}`}>
      <div
        className={`h-screen w-screen flex items-center justify-center pt-4 bg-white dark:bg-[#000]`}
      >
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-3 right-3 flex items-center p-4  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none bg-white dark:bg-[#000]"
          >
            {darkMode ? (
              <Moon size={32} color="#000" />
            ) : (
              <SunDim size={32} color="#ffc222" />
            )}
          </button>
          <div className="flex justify-center items-center">
            <i>
              <Chats size={80} color="#4ADF83" />
            </i>
            <h1 className="text-5xl font-semibold text-green-400 md:text-4xl">
              Responde aqui!
            </h1>
          </div>

          <p className="font-medium text-xl dark:text-white text-black">
            Faça login para continuar
          </p>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <button
                className="border-none rounded-xl mt-3 cursor-pointer w-80 h-16 flex justify-center items-center gap-3 bg-red-600 hover:bg-red-800 md:w-72 md:h-16"
                onClick={handleGoogleLogin}
                // disabled={!isSignedIn}
              >
                <GoogleLogo color="#fff" size={32} />
                <span className="text-xl font-semibold text-white">
                  Entrar com Google
                </span>
              </button>
              {hasAuthError && (
                <span className="text-red-600">
                  Falha ao conectar ao Google, verifique se as permissões.
                </span>
              )}
              <pre>{JSON.stringify(session)}</pre>
              {/* <button
                className="border-none rounded-xl mt-3 cursor-pointer w-80 h-16 flex justify-center items-center gap-3 bg-gray-600 hover:bg-gray-800 md:w-72 md:h-16"
                onClick={handleGithubLogin}
              >
                <GithubLogo color="#fff" size={32} />
                <span>Entrar com Github</span>
              </button> */}
            </>
          )}

          {errorObject && (
            <h1 className="font-medium text-xl dark:text-white text-black">
              {errorObject.message}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
