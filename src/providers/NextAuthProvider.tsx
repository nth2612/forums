import { SessionProvider } from 'next-auth/react'
import { auth } from 'src/auth'
import { ChildrenProps } from 'src/types/common'

export async function NextAuthProvider({ children }: ChildrenProps) {
  const session = await auth()
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  )
}
