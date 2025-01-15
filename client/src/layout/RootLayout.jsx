import React, { useEffect } from 'react'

const RootLayout = ({ children, className }) => {
    // automatically scroll to top when you navigate to another page. or new page
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className={`w-full px-4 lg:px-24 md:px-16 sm:px-7 ${className}`}>
            {children}
        </div>

    )
}

export default RootLayout