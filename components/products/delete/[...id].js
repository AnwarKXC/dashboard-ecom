
import Layout from "@/pages/Layout";
import { useRouter } from "next/router";
import { useEffect,useState} from "react";
import axios from "axios";


export default function DeleteProduct () {
   const [ product, setProduct ] = useState( );
   const router = useRouter();
   const { id } = router.query;
   useEffect( () => {
      if ( !id ) { return; };
      axios.get( '/api/products?id=' + id ).then( res => {
         setProduct( res.data );
      } );
   }, [ id ] );


   function backHandler () {
      router.push( '/Products' );
   }
   async function deleteHandler () {
      await axios.delete( '/api/products?id=' + id );
      backHandler();
   }



   return (
      <Layout>
         <h1 className="text-center">Do you really want delete product :  &nbsp;  <span className=" font-semibold text-slate-800 border-b-2 border-slate-700">{ product?.name }</span>  ?</h1>
         <div className="flex justify-center gap-4">
            <button className="btn-prim" onClick={backHandler }>NO</button>
            <button className="btn-prim-red" onClick={deleteHandler}>YES</button>
         </div>
         

      </Layout>
   );
}