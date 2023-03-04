import React from 'react'
import {getProviders, signIn} from "next-auth/react"

export default function signin({provider}) {
  return (
    <div className='flex justify-center mt-20 space-x-4'>
        <img src="https://www.thesocmed.com/wp-content/uploads/2021/10/logo-dan-font.png" 
        alt="image twitter di hp" 
        className='hidden object-cover md:w-44 md:h-80 rotate-6 md:inline-flex'
        />
    
    <div className=''>
        {Object.values(provider).map((provider,index) => (
            <div className='flex flex-col items-center' key={index}>
                <img 
                className='w-36 object-cover'
                src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" alt="logo twitter" />
                <p className='text-center text-sm italic my-10'>Aplikasi ini di buat untuk tujuan pembelajaran next js dan firebase by M Aqmal</p>
                <button onClick={() => signIn(provider.id, {callbackUrl: "/"})} className='bg-red-400 rounded-lg p-3 text-white hover:bg-red-500'>Login dengan {provider.name}</button>
            </div>
        ))}
    </div>
    
    </div>

    
  )
}


export async function getServerSideProps(){
    const provider = await getProviders();

    return {
        props : {
            provider,
        }
    }
}