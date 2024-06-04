import React from "react";

const Badge = ({type}) =>{
    return(
        <div className="text-lg rounded-full bg-orange-300 border-2 border-orange-800 hover:bg-orange-400 text-black transition duration-150 m-1 p-1">
            {type}
        </div>
    )
}

export default Badge;