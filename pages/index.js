import Layout from "@/components/Layout"; import { useSession ,signIn} from "next-auth/react";
import Head from "next/head";



export default function Home () {

  const { data: session } = useSession();
  if ( session ) {
    
    return (
      <>
        <Head>
          <title>welcom { session.user?.name}</title>
        </Head>
      <Layout>
        <h1 className=" flex  gap-1 text-xs sm:text-lg text-center pb-2 justify-center "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-orange-700"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className=" text-slate-900  font-serif border-b border-slate-800 p-1 font-medium"> { session?.user?.name } </span> </h1>
        <p className=" text-center text-xs sm:text-lg text-slate-700 font-semibold  pb-2"> &quot; Admin only can see Slides section &quot; </p>
        </Layout>
        </>
    );
  } else {
    return (
<>
        <Head>
          <title> Dashboard </title>
        </Head>
      <main className=" flex justify-center items-center flex-col bg-slate-600 w-screen h-screen">
        <h1> Dashboard E-commerce </h1>
        <h2 className=" text-slate-900 font-semibold text-2xl p-8">login first </h2>
        <form className="flex flex-col mb-5">
          <label>Email</label>
          <input placeholder="E-mail" type="email"></input>
          <label className="-mt-2"> Password</label>
          <input placeholder="Password" type="password"></input>
          <button className="p-2 px-7 bg-slate-800 text-white rounded-lg"  type="submit"> Log In</button>
        </form>
        <div><button className=" p-2 px-7 bg-slate-800 text-white rounded-lg" onClick={ () => signIn() }>Sign in with Google </button></div>
      </main>
</>
    )
  }
}
