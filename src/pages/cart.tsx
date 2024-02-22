import Header from "../../components/Header";
import { NextPage } from "next";
import Head from "next/head";

const Cart: NextPage = () => {
  return (
    <>
      <Head>
        <title> Carrinho </title>
        <meta name="description" content="Carrinho de Compras" />
        <link rel="icon" href="./favicon.icon" />
      </Head>
      <Header />
      <h2>Carrinho</h2>
    </>
  );
};
export default Cart;
