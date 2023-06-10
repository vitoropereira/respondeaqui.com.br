'use client'

import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'

import useLoginModal from 'app/hooks/useLoginModal'
import useRegisterModal from 'app/hooks/useRegisterModal'

import Modal from './Modal'
import Input from '../inputs/Input'
import Heading from '../Heading'
import Button from '../Button'

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleGoogleLogin = async () => {
    const login = await signIn('google', {
      callbackUrl: '/dashboard',
    })
    console.log(login)
    toast.success('Logged in')
    loginModal.onClose()
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Logged in')
        loginModal.onClose()
        router.push('../dashboard')
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const onToggle = useCallback(() => {
    registerModal.onOpen()
    loginModal.onClose()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bem vindo!" subtitle="Faça seu login." />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continuar com Google"
        icon={FcGoogle}
        onClick={handleGoogleLogin}
      />
      <div
        className="
      mt-4 text-center font-light text-neutral-500"
      >
        <p>
          Primeira vez no Responde Aqui?
          <span
            onClick={onToggle}
            className="
              cursor-pointer
              text-neutral-800 
              hover:underline
            "
          >
            {' '}
            Criar uma conta.
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
