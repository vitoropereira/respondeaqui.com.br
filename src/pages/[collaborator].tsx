import { motion } from "framer-motion"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { api } from "../service/api"

interface CollaboratorDataProps {
  gitData: {
    login: string,
    name: string,
    location: string
    email?: string,
    bio: string,
    followers: number,
    following: number
  }
}

export default function Collaborator({ gitData }: CollaboratorDataProps) {

  const {
    login,
    name,
    location,
    email,
    bio,
    followers,
    following,
  } = gitData

  const collaboratorAvatar = `./avatars/${login}.jpg`
  const layoutIdLogo = `${login}_logo`

  const gitHubProfile = `https://github.com/${login}`

  return (
    <>
      <div className="h-full">
        <div className="mt-5 flex flex-col md:flex-row h-full">
          <motion.img
            src={collaboratorAvatar}
            className="h-2/4 rounded-full"
            layoutId={layoutIdLogo}
          />
          <div className="ml-5 flex flex-1 flex-col mt-4 md:mt-0">
            <div className="pl-2 mb-3 flex-1">
              <h4 className="text-xl md:text-2xl">Meu nome: <span className="font-extrabold">{name ?? 'Sem nome'}</span></h4>
              <p>"{bio}"</p>
              <p>Localidade: <span className="font-extrabold">{location}</span></p>
              <p>Total de Followers: {followers}</p>
              <p>Total de Following: {following}</p>
              <p>E-mail para contato: {email}</p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex-1"
            >
              <Link href={gitHubProfile}>
                <a className="bg-gray-900 text-gray-50 px-6 py-3 text-lg font-semibold rounded-xl hover:bg-gray-500">
                  Ver Repositórios
                </a>
              </Link>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-1 flex justify-center"
        >
          <Link href="./">
            <a className="bg-blue-400 text-gray-50 px-6 py-3 text-lg font-semibold rounded-xl hover:bg-gray-500">
              Voltar para Home
            </a>
          </Link>
        </motion.div>
      </div>
    </>
  )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { collaborator } = params

  const { data } = await api.get(`/users/${collaborator}`)

  const gitData = {
    login: data.login,
    name: data.name,
    location: data.location,
    email: data.email,
    bio: data.bio,
    followers: data.followers,
    following: data.following,
  }

  return {
    props: {
      gitData,
    },
    redirect: 60 * 30
  }

}
