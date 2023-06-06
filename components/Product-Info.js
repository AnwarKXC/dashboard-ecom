import Layout from "./Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";



export default async function ProductInfo () {

   const router = useRouter();
   const { id } = router.query;
   useEffect( () => {
      if ( !id ) {
         return;
      };
      axios.get( '/api/products?id=' + id ).then( res => {
         product = res.data;
      } );
   }, [ id ] );


   return (
      
      <Layout>
         { product.map( ( product ) => ( <div key={ product.id }><label>Product Name:{ product.name } </label></div> ) ) }

      </Layout>
   );
}