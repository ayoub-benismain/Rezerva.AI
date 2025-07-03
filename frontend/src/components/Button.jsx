import React from "react";


export default function Button({textValue}) {
    return (
        <>
            <div className = 'flex justify-center items-center py-2 px-6 bg-black text-white rounded-4xl cursor-pointer hover:bg-gray-800 w-2/3 lg:w-auto'>
                {textValue}
            </div>
        </>
    )
}