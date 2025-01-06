import React from 'react'
import banner from '/home.png'
import SearchForm from './Searchbar'

function Banner() {
    return (
        <>
            <div className='pt-[80px] mx-4'><SearchForm /></div>

            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row mb-5 dark:bg-slate-900 dark:text-white' >
                <div className='w-full order-2 md:order-1 md:w-1/2 md:mt-10'>
                    <div className='space-y-8 '>
                        <h1 className='text-4xl text-gray-800 dark:text-white lg:text-7xl pt-5 font-[600]'>Gear Up for{" "}<span className='bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent' >Success:</span> Your Ultimate <span className='bg-gradient-to-r from-red-600 via-yellow-600 to-green-500 bg-clip-text text-transparent'>Preparation Hub!</span></h1>
                        <p className='text-md'>Simplify complex concepts with our detailed programming notes and ace your interviews with expert-curated questions. Master DSA through comprehensive sheets and hands-on projects, ensuring we meet your learning needs.</p>
                    </div>
                    <a href='#homecontentcard'><button className="border border-red-500 py-2 rounded-md text-white mb-10 px-4 mt-6 group bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30">Get Started &rarr;</button></a>
                </div>

                <div className='w-full order-1 md:order-2 md:w-1/2 flex justify-center items-center '>
                    <img src={banner} className="w-full opacity-100" alt='img' />
                </div>
            </div>

        </>
    )
}

export default Banner 