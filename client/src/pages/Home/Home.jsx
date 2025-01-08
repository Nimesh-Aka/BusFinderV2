import React from 'react'
import Hero from './hero/Hero'
import Services from './services/Services'
import TopSearch from './topsearch/TopSearch'

const Home = () => {
    return (
        <div className="w-full min-h-screen space-y-16 pd-16">
            {/* Hero */}
            <Hero/> 
            {/*Services*/}
            <Services/>
            {/*Top Search*/}
            <TopSearch/>
        </div>
    )
}

export default Home  