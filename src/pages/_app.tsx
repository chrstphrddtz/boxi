import '@/styles/globals.css'
import { Figtree } from 'next/font/google'
import type { AppProps } from 'next/app'

const figtree = Figtree({ 
  weight: ['400', '600', '800'],
  style: ['italic', 'normal'],
  subsets: ['latin'] 
})


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
