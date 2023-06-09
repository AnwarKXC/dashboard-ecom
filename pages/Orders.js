import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";









export default function Orders () {

   const [ orders, setOrders ] = useState( [] );

   useEffect( () => {
      axios.get( './api/order' ).then( res => {
         setOrders( res.data );
      } );
   }, [] );

   return (
      <>
         <Head>
            <title>Orders</title>
         </Head>
      <Layout>
         <h1>Orders</h1>
         <table className="general-table">
            <thead>
               <tr>
                  <th>Date</th>
                  <th>Paid</th>
                  <th>Recipient</th>
                  <th>Products</th>
               </tr>
            </thead>
            <tbody>
               { orders?.length > 0 && orders.map( order => (
                  <tr key={ order._id }>
                     <td>{ ( new Date( order.createdAt ) ).toLocaleString() }
                     </td>
                     <td >
                        <span className={  order.paid ? 'text-green-600 font-semibold ' : 'text-red-700 font-semibold' } >{ order.paid ? 'YES' : 'NO' }</span>  
                     </td>
                     <td>
                        { order.name } { order.email }<br />
                        { order.city } { order.postalCode } { order.country }<br />
                        { order.streetAddress }
                     </td>
                     <td>
                        { order.line_items.map( l => (
                           <>
                              <span className=" text-red-950 font-semibold text-base "> 
                                 { l.quantity }x</span>
                              { l.price_data?.product_data?.name } <br />
                           </>
                        ) ) }
                     </td>
                  </tr>
               ) ) }
            </tbody>
         </table>

         </Layout>
         </>
   );
}