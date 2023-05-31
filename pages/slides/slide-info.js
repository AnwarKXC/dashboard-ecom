import Layout from "../Layout";
import { useEffect } from "react";
import { useRouter } from "react";

export default async function SlideInfo () {

   const router = useRouter();
   const { id } = router.query;
   useEffect( () => {
      if ( !id ) {
         return;
      };
      axios.get( '/api/slider?id=' + id ).then( res => {
         slide( res.data );
      } );
   }, [ id ] );


   return (
      <Layout>
         <label>slide Name: { slide?.name } </label>
      </Layout>
   );
}