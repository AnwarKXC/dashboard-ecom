import { Slide } from "@/models/slide";

import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

import { mongooseConnect } from "@/lib/mongoose";

export default async function handle ( req, res ) {
   const { method } = req;
   await mongooseConnect();
   await isAdminRequest( req, res );

   if ( method === 'GET' ) {
      if ( req.query?.id ) {
         res.json( await Slide.findOne( { _id: req.query.id } ) );
      } else {
         res.json( await Slide.find().sort( { createdAt: -1 } ) );
      }
   }

   if ( method === 'POST' ) {
      const { name, description, price, images, category, properties } = req.body;
      const productDoc = await Slide.create( {
         name, description, price, images, category, properties,
      } )
      res.json( productDoc );
   }

   if ( method === 'PUT' ) {
      const { name, description, price, images, category, properties, _id } = req.body;
      await Slide.updateOne( { _id }, { name, description, price, images, category, properties } );
      res.json( true );
   }

   if ( method === 'DELETE' ) {
      if ( req.query?.id ) {
         await Slide.deleteOne( { _id: req.query?.id } );
         res.json( true );
      }
   }
}