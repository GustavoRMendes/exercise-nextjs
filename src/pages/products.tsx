import { NextPage } from "next" 
import Head from 'next/head'

const Products: NextPage = () => {
  return (
    <>
      <Head>
          <title> Produtos </title>
          <meta name="description" content="Conheça todos os nossos produtos" />
          <link rel="icon" href="./favicon.icon" />
      </Head>
      <h2>
        Nossos Produtos
      </h2>
    </>
  )
}
export default Products