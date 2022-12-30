import Confetti from "react-confetti";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GetStaticProps } from "next";

import collaborators from "../../public/init/collaborators.json";
import CollaboratorsCard from "../components/CollaboratorsCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Login from "./login";

export interface OwnerProps {
  username: string;
  avatar_url: string;
  html_url: string;
}

interface PageProps {
  imagesUrls: OwnerProps[];
}

export default function Page({ imagesUrls }: PageProps) {
  return <Login />;

  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, [router]);

  const [shuffledCollaborators, setShuffledCollaborators] = useState([]);
  const [confettiWidth, setConfettiWidth] = useState(0);
  const [confettiHeight, setConfettiHeight] = useState(0);

  useEffect(() => {
    setShuffledCollaborators(shuffle(collaborators));

    function handleResize() {
      setConfettiWidth(window.screen.width);
      setConfettiHeight(window.screen.height);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <Confetti
        width={confettiWidth}
        height={confettiHeight}
        recycle={false}
        numberOfPieces={800}
        tweenDuration={15000}
        gravity={0.15}
      />

      <h1 className="text-2xl sm:text-4xl lg:text-5xl mt-2 md:mt-4 leading-none font-extrabold tracking-tight text-gray-100">
        Os colaboradores deste projeto são:
      </h1>

      <p className="mt-3">
        Este é um projeto desenvolvido para auxiliar pessoas a estudarem para
        concurso. A metodologia utilizada é de apenas responder questões. Esta
        página é uma homenagem a todos que em algum momento auxiliou este
        projeto de alguma forma.
      </p>

      <div className="mt-10 md:mt-24 flex flex-wrap justify-center">
        {imagesUrls.map((item) => {
          return (
            <CollaboratorsCard
              key={item.username}
              username={item}
              layoutId={item.username}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

function shuffle(arr) {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
}

export const getStaticProps: GetStaticProps = async () => {
  const shuffleCollaborators = shuffle(collaborators);
  const imagesUrls = [];

  shuffleCollaborators.forEach(async (username: string) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );

      const data = await response.json();
      imagesUrls[username] = {
        username,
        avatar_url: data[0].owner.avatar_url,
        html_url: data[0].owner.html_url,
      };
    } catch (error) {
      console.log(error, "shuffleCollaborators Mensagem de erro!!");
    }
  });

  return {
    props: { imagesUrls },
  };
};
