import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CollaboratorsCardProps {
  username: string;
  layoutId: string;
}

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

const CollaboratorsCard = ({ username, layoutId }: CollaboratorsCardProps) => {
  const [imagesUrl, setImagesUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getImagesUrl = async (username: string) => {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const data = await response.json();
    const imagesUrl = data.map(
      (repo: RepositoryProps) => repo.owner.avatar_url
    );
    setImagesUrl(imagesUrl);
    setIsLoading(true);
  };

  useEffect(() => {
    getImagesUrl(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const collaboratorPage = `./${username}`;
  const layoutIdLogo = `${layoutId}_logo`;

  return (
    <Link href={collaboratorPage}>
      <a className="hover:bg-blue-300">
        {isLoading && (
          <>
            <div className="relative w-20 md:w-40 mx-3 mt-3 cursor-pointer transition">
              <motion.img
                src={imagesUrl}
                className="w-full h-full rounded-t-xl"
                layoutId={layoutIdLogo}
              />
            </div>
            <div className="mx-3 m-auto mb-3 py-2 w-20 md:w-40 rounded-b-xl bg-blue-300 hover:bg-blue-600 transition">
              <p className="text-xs md:text-sm lg:text-md flex justify-center whitespace-nowrap overflow-hidden overflow-ellipsis">
                {" "}
                @{username}{" "}
              </p>
            </div>
          </>
        )}
      </a>
    </Link>
  );
};

export default CollaboratorsCard;
