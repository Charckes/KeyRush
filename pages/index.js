import Head from 'next/head'
import Home from '@/components/Home'
import Layout from '@/components/Layout'
import Nav from '@/components/Nav';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>KeyRush</title>
        <meta name="description" content="Jogue e aprende a digitar mais rápido." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Nav />
        <Home></Home>
      </Layout>

    </>
  )
}
