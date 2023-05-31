import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";
import Spinner from "../products/spinner";

export default function SlideForm ( {
   _id,
   name: existingTitle,
   images: existingImages,
   category: assignedCategory,
} ) {
   const [ name, setName ] = useState( existingTitle || '' );
   const [ category, setCategory ] = useState( assignedCategory || '' );
   const [ images, setImages ] = useState( existingImages || [] );
   const [ goToProducts, setGoToProducts ] = useState( false );
   const [ isUploading, setIsUploading ] = useState( false );
   const [ categories, setCategories ] = useState( [] );
   const router = useRouter();
   useEffect( () => {
      axios.get( '/api/categories' ).then( result => {
         setCategories( result.data );
      } )
   }, [] );
   async function saveProduct ( ev ) {
      ev.preventDefault();
      const data = { name, images, category };
      if ( _id ) {
         //update
         await axios.put( '/api/slider', { ...data, _id } );
      } else {
         //create
         await axios.post( '/api/slider', data );
      }
      setGoToProducts( true );
   }
   if ( goToProducts ) {
      router.push( '/Slides' );
   }
   async function uploadImages ( ev ) {
      const files = ev.target?.files;
      if ( files?.length > 0 ) {
         setIsUploading( true );
         const data = new FormData();
         for ( const file of files ) {
            data.append( 'file', file );
         }
         const res = await axios.post( '/api/upload', data );
         setImages( oldImages => {
            return [ ...oldImages, ...res.data.links ];
         } );
         setIsUploading( false );
      }
   }
   function updateImagesOrder ( images ) {
      setImages( images );
   }

   return (
      <form onSubmit={ saveProduct }>
         <label>Slide name</label>
         <input
            type="text"
            placeholder="Slide name"
            value={ name }
            onChange={ ev => setName( ev.target.value ) } />
         <div className="flex justify-center gap-6 ">
            <div className=" rounded-lg border-slate-200 bg-slate-400 p-1 ">
               <label className="m-0">Category</label>
               <select value={ category }
                  onChange={ ev => setCategory( ev.target.value ) }>
                  <option value="" className=" font-semibold">Uncategorized</option>
                  { categories?.length > 0 && categories?.map( c => (
                     <option key={ c._id } value={ c._id }>{ c.name }</option>
                  ) ) }
               </select>
            </div>
         </div>
         <br></br>
         <label>
            Photos
         </label>
         <div className="mb-2 flex flex-wrap gap-1">
            <ReactSortable
               list={ images }
               className="flex flex-wrap gap-1"
               setList={ updateImagesOrder }>
               { !!images?.length && images.map( link => (
                  <div key={ link } className="h-24  shadow-md rounded-xl border-2 border-gray-100">
                     <img src={ link } alt="" className="rounded-lg" />

                  </div>
               ) ) }
            </ReactSortable>
            { isUploading && (
               <div className="h-24 flex items-center">
                  <Spinner />
               </div>
            ) }
            <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1  rounded-xl bg-slate-100 shadow-sm border border-primary">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
               </svg>
               <div>
                  Add image
               </div>
               <input type="file" onChange={ uploadImages } className="hidden" />
            </label>
         </div>
         <button
            type="submit"
            className="btn-prim">
            Save
         </button>
         <button onClick={ () => router.push( '/' ) } className="btn-prim">Cancel </button>
      </form>
   );
}