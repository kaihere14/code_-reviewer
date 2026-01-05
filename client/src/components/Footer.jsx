import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div className="w-full  text-zinc-500 py-6 px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 md:mr-10">
                &copy; {new Date().getFullYear()} CodeAudit. All rights reserved.
            </div>
        </div>  
    </footer>
  )
}

export default Footer
