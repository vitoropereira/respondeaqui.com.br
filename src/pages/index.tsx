import Confetti from "react-confetti";
import { useState, useEffect } from "react";

import collaborators from "../../public/init/collaborators.json";
import CollaboratorsCard from "../components/CollaboratorsCard";
import { GetStaticProps } from "next";

export interface OwnerProps {
  id: number;
  node_id: string;
  avatar_url: string;
  url: string;
  html_url: string;
  repos_url: string;
}

interface RepositoryProps {
  owner: OwnerProps;
}

export default function Page({ imagesUrls }) {
  // console.log(imagesUrls);
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
      <Confetti
        width={confettiWidth}
        height={confettiHeight}
        recycle={false}
        numberOfPieces={800}
        tweenDuration={15000}
        gravity={0.15}
      />

      <h1 className="text-2xl sm:text-4xl lg:text-5xl mt-2 md:mt-4 leading-none font-extrabold tracking-tight text-gray-900">
        Os colaboradores deste projeto são:
      </h1>

      <p className="mt-3">
        Este é um projeto desenvolvido para auxiliar pessoas a estudarem para
        concurso. A metodologia utilizada é de apenas responder questões. Esta
        página é uma homenagem a todos que em algum momento auxiliou este
        projeto de alguma forma.
      </p>

      <div className="mt-10 md:mt-24 flex flex-wrap justify-center">
        {shuffledCollaborators.map((username) => {
          return (
            <CollaboratorsCard
              key={username}
              username={username}
              layoutId={username}
              imagesUrls={imagesUrls}
            />
          );
        })}
      </div>
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
  const imagesUrls = shuffleCollaborators.forEach(async (username: string) => {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    const data = await response.json();
    console.log(data);
  });

  console.log("imagesUrls");
  console.log(imagesUrls);
  return {
    props: {},
    revalidate: 1,
  };
};
