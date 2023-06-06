import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductForm from "../../../components/productForm";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
export default function EditProduct () {
   const [ productInfo, setProductInfo ] = useState( null );
   const router = useRouter();
   const { id } = router.query;
   useEffect( () => {
      if ( !id ) { return; };
      axios.get( '/api/products?id=' + id ).then( res => {
         setProductInfo( res.data )
      } )
   }, [ id ] )

   return (
      <>
         <Head>
            <title>{ productInfo?.name }</title>
         </Head>
         <Layout>
            <h1>Edit Product :  &nbsp;  <span className=" font-semibold text-slate-800 border-b-2 border-slate-700">{ productInfo?.name }</span> </h1>
            { productInfo && ( <ProductForm { ...productInfo } /> ) }

         </Layout>
      </>
   );
}