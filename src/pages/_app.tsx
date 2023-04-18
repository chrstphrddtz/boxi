// import '@/styles/globals.css'
import GlobalStyle from "../styles/styles";
import { Figtree } from 'next/font/google'
import type { AppProps } from 'next/app'
import { SWRConfig } from "swr";
import Layout from '../../components/Layout'

// const HamburgerIcon = () => (<div className='p-1/2'><svg className="w-8 h-8 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"></path></svg></div>)



const figtree = Figtree({ 
  weight: ['400', '600', '800'],
  style: ['italic', 'normal'],
  subsets: ['latin'] 
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
    <Layout>
      <GlobalStyle/>
      <Component {...pageProps} />
    </Layout>
    </SWRConfig>
  )


}
