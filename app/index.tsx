import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Chats, GoogleLogo } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";

import { Loading } from "src/components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorObject, setErrorObject] = useState(undefined);

  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status == "authenticated";

  const handleIsLoading = () => {
    setIsLoading(!isLoading);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signIn("google");
  };

  useEffect(() => {
    if (isSignedIn) {
      router.push("../dashboard");
    }
  }, [isSignedIn, router]);

  Router.events.on("routeChangeStart", handleIsLoading);

  return (
    <div className="w-full h-screen overflow-y-hidden p-4 bg-gradient-to-r from-blue-500 flex justify-between items-center">
      <Chats className="absolute overflow-y-hidden text-[560px] ml-28 -mt-10 text-white font-thin -rotate-12 opacity-20 max-[768px]:hidden -z-10" />
      {/* {styles.content} */}
      <div className="w-[50%} ml-[55%] grid max-[768px]:w-full max-[768px]:m-0">
        <div className="flex justify-center items-center h-32">
          <Chats style={{ fontSize: "80px" }} />
          <h1 className="text-3xl font-semibold mt-4 text-center">
            Responde aqui!
          </h1>
        </div>
        <strong className="mt-20 mr-0 mb-8">Bem-vindo</strong>

        {/* {styles.title} */}
        <div className="flex mb-4 z-10">
          <GoogleLogo size={36} />
          <span className="max-w-[220px] ml-4 mb-4 text-base font-medium">
            Faça login com sua conta Google para iniciar.
          </span>
        </div>
        {isLoading || session.status == "loading" ? (
          <Loading size={10} />
        ) : (
          <>
            <div className="max-w-[350px] p-2 flex justify-between rounded-md">
              <button
                className="border-none rounded-xl cursor-pointer w-80 h-16 flex justify-center items-center gap-3 bg-red-600 hover:bg-red-800 md:w-72 md:h-16"
                onClick={handleGoogleLogin}
                // disabled={isSignedIn}
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
            </div>
          </>
        )}
        <span className="max-w-[400px] mt-10 text-lg max-[768px]:text-base">
          Responde aqui é uma plataforma de discussão online onde é possível
          conectar-se com outras pessoas e compartilhar ideias sobre assuntos de
          interesse.
        </span>
      </div>
    </div>
  );
}