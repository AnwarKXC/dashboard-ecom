import mongoose, { model, Schema, models } from "mongoose";

const SlideSchema = new Schema( {
   name: { type: String,required:true},
   images:  { type: String } ,
   category: { type: mongoose.Types.ObjectId, ref: 'Category', required:true },
}, {
   timestamps: true,
} );

export const Slide = models.Slide || model( 'Slide', SlideSchema );