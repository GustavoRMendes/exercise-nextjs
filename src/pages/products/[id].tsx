import  { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { fetchProduct, fetchProducts, type ProductType } from "../../../components/services/products";
import type { ReactNode } from "react";
import Head from "next/head";
import Header from "../../../components/Header";
import { Container } from "reactstrap";
import ProductsDetails from "../../../components/ProductsDetails";



export const getStaticProps: GetStaticProps = async(context) => {
  const  id  = context.params?.id

  if(typeof id === 'string'){
    const product = await fetchProduct(id)
    return {
      props: {
        product
      }
    }
    return {
      redirect: {
        destination: '/products',
        permanent: false
      }
    }
  }
}
export const getStaticPaths : GetStaticPaths = async() => {
  const products = await fetchProducts()
  const paths = products.map((product) => {
    return { params: { id: product.id.toString() }}
})

  return {
    paths,
    fallback: false
  }
} 

const Product: NextPage = ( props: {
  children?: ReactNode
  product?: ProductType
}) => {
  return (
    <>
      <Head>
        <title></title>
        <meta name="" content=""/>
        <link rel="icon" href="./favicon.ico" />
        <Header/>
        <Container>
          <ProductsDetails product={props.product!}/>
        </Container>
      </Head>
    </>
  )
}
export default Product