import React from 'react'

const ServiceCard = ({ icon: Icon, title, desc }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-4 text-center duration-300 ease-in-out cursor-pointer p-7 bg-neutral-200 hover:bg-neutral-300 rounded-xl">
            <div className="flex items-center justify-center w-full gap-x-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-400/40 ">
                    <Icon className="w-7 h-7 text-neutral-800"/>
                </div>
                <h1 className="text-2xl font-bold text-neutral-800">
                    {title}
                </h1>
            </div>
            <p className="text-sm font-normal text-neutral-600">
                {desc}
            </p>
        </div>
    )
}

export default ServiceCard