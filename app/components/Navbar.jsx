import { redirect } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const handleclick=()=>{
        redirect('/')
    }
    return (
        <>

            <div className='pb-4 pt-4 flex flex-row justify-between items-center'>
                <div onClick={handleclick} className='text-2xl text-amber-500 cursor-pointer'>
                    Codementor.Ai
                </div>
                <div className='text-amber-300'>
                    Your AI-powered code reviewer
                </div>
                <div className='text-cyan-700  flex bg-amber-300 px-3 py-2 rounded-2xl cursor-pointer '>
                    Login
                </div>
            </div>

        </>
    )
}

export default Navbar
