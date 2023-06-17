import mongoose, { model, Schema, models } from "mongoose";

const SlideSchema = new Schema( {
   name: { type: String, required: true },
   description: String,
   price: { type: Number, required: true },
   images: [ { type: String } ],
   category: { type: mongoose.Types.ObjectId, ref: 'Category' },
   properties: { type: Object },
}, {
   timestamps: true,
} );

export const Slide = models.Slide || model( 'Slide', SlideSchema );