import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Nav from "./Nav";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout ( { children } ) {
   const logOut = () => signOut();
   const [ showNav, setShowNav ] = useState( false );

   const { data: session } = useSession();
   if ( !session ) {
      return (
         <main className="flex h-screen w-screen items-center justify-center">
            <button onClick={ () => signIn( 'google' ) } className=" bg-slate-700 px-4 rounded-xl p-2 text-white "><Image
               src="https://authjs.dev/img/providers/google.svg"
               alt="Picture of the author"
               width={ 25 }
               height={ 25 }
               className=" inline-block m-1"
            /> Login with Google</button>
         </main>
      );
   }
   return (

      <main className=" bg-slate-800 min-h-screen flex ">

         <Nav logOut={ logOut } visible={ showNav } />
         <div className=" tracking-wider bg-slate-300 flex justify-start w-screen  m-1 md:m-4 md:-ml-2 rounded-lg flex-col">
            <div className="  md:hidden flex">
               <button className=" text-slate-700" onClick={ () => setShowNav( true ) }><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
               </svg>
               </button>
               <div className="flex grow justify-center">
                  <Logo />
               </div>
            </div>
            <hr  className=" border font-extrabold border-slate-500 -mt-4 block md:hidden "/>
            <div className=" p-1  pt-3">{ children }</div>
         </div>

      </main>
   );
}