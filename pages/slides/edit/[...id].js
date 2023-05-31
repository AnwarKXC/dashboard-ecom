import Layout from "@/pages/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SliderForm from "../SliderForm";
import axios from "axios";

export default function EditProduct () {
   const [ productInfo, setProductInfo ] = useState( null );
   const router = useRouter();
   const { id } = router.query;
   useEffect( () => {
      if ( !id ) { return; };
      axios.get( '/api/slider?id=' + id ).then( res => {
         setProductInfo( res.data )
      } )
   }, [ id ] )

   return (
      <Layout>
         <h1>Edit Product :  &nbsp;  <span className=" font-semibold text-slate-800 border-b-2 border-slate-700">{ productInfo?.name }</span> </h1>
         { productInfo && ( <SliderForm { ...productInfo } /> ) }

      </Layout>
   );
}