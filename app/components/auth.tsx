'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
} from '@chakra-ui/react'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { register } from 'module'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function Auth() {
  const { loginUser } = useStore()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      } else {
        //エラーが発生しなかった時に'/'に遷移する
        router.push('/auth/todo-crud')
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      }
    }
  }
  function signOut() {
    supabase.auth.signOut()
  }
  return (
    <Flex>
      <Box
        boxShadow="lg"
        w="600px"
        paddingY="120px"
        paddingX="32px"
        borderRadius="8px"
        border="1px solid"
        borderColor="gray.100"
        m="0 auto"
        display="flex"
      >
        <Box w="100%">
          <Heading color="gray.800" mb="48px" textAlign="center" size="xl">
            ようこそ
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormLabel fontWeight="bold">Eメール</FormLabel>
            <Input
              type="text"
              size="lg"
              mb="8"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <FormLabel fontWeight="bold">パスワード</FormLabel>
            <Input
              type="password"
              size="lg"
              mb="8"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <div>
              <Button type="submit">
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </div>
          </form>
          <Button onClick={() => setIsLogin(!isLogin)}>change mode ?</Button>
        </Box>
      </Box>
    </Flex>
  )
}
