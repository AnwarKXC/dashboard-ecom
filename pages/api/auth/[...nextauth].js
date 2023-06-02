import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { getServerSession } from 'next-auth';





//  const adminEmails = [ 'anwarkamaleg2000@gmail.com', ];


export default NextAuth( {
   providers: [
      GoogleProvider( {
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,
         authorization: {
            params: {
               prompt: "consent",
               access_type: "offline",
               response_type: "code"
            }
         }
      } ),
   ],
   adapter: MongoDBAdapter( clientPromise ),
} );


export const authOptions = {

   providers: [
      GoogleProvider( {
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,
         authorization: {
            params: {
               prompt: "consent",
               access_type: "offline",
               response_type: "code"
            }
         }
      } ),
   ],
   adapter: MongoDBAdapter( clientPromise ),
   callbacks: {
      session: ( { session } ) => {
         if ( adminEmails.includes( session?.user?.email ) ) {
            return session;
         } else {
            return ;
         }
      },
   },
};


// export async function isAdminRequest ( req, res ) {
//    const session = await getServerSession( req, res, authOptions );
//    if ( !adminEmails.includes( session?.user?.email ) ) {
//       res.status( 404 );
//       res.end();
//       throw 'not an admin';
//    }
// }