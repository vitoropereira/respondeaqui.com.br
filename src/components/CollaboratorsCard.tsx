import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OwnerProps } from "../pages/index_old";

interface CollaboratorsCardProps {
  username: OwnerProps;
  imagesUrls?: string;
  layoutId: string;
}

const CollaboratorsCard = ({ username, layoutId }: CollaboratorsCardProps) => {
  const [imagesUrl, setImagesUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const collaboratorPage = `./${username.username}`;
  const layoutIdLogo = `${layoutId}_logo`;

  return (
    <Link href={collaboratorPage}>
      <a className="hover:bg-blue-300">
        <div className="relative w-20 md:w-40 mx-3 mt-3 cursor-pointer transition">
          <motion.img
            src={username.avatar_url}
            className="w-full h-full rounded-t-xl"
            layoutId={layoutIdLogo}
          />
        </div>
        <div className="mx-3 m-auto mb-3 py-2 w-20 md:w-40 rounded-b-xl bg-blue-300 hover:bg-blue-600 transition">
          <p className="text-xs md:text-sm lg:text-md flex justify-center whitespace-nowrap overflow-hidden overflow-ellipsis">
            {" "}
            @{username.username}{" "}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default CollaboratorsCard;
