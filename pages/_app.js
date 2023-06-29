import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"

import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  weight: '400',
  subsets: ['latin']
})

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <div className={openSans.className}>

      <Component {...pageProps}/>
      </div>
    </SessionProvider>
  )
}