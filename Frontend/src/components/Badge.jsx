import { useState } from "react";
import React from "react";
import EditDialog from "./EditForms/EditDialog"

const Badge = ({type}) =>{
    const [showEditDialog, setShowEditDialog] = useState(false);
    type=type.toLowerCase()
    return(
        <div>
            <div  onClick={() => setShowEditDialog(true)} className="text-lg rounded-full bg-orange-200 hover:bg-orange-400 text-black transition duration-150 m-1 p-1">
                {type ? type : "HOME"}
            </div>
            <EditDialog show={showEditDialog} type={type ? type : "task"} handleClose={() => setShowEditDialog(false)}/>
        </div>
    )
}

export default Badge;