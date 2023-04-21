import Head from 'next/head'
import { Figtree } from 'next/font/google'

const figtree = Figtree({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Boxi</title>
        <meta name="description" content="Spiced Academy graduation Project from Christoph Raddatz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
       <h1>Welcome to BOXI ...</h1>
      </div>
    </>
  )
}
