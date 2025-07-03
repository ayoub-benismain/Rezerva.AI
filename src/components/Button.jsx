import React from "react";


export default function Button({textValue}) {
    return (
        <>
            <div className = 'py-2 px-6 bg-black text-white rounded-4xl cursor-pointer hover:bg-gray-800'>
                {textValue}
            </div>
        </>
    )
}