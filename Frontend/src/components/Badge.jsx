import { useState } from "react";
import React from "react";
import EditDialog from "./EditForms/EditDialog"

const Badge = ({type, entity, updateTasks}) =>{
    const [showEditDialog, setShowEditDialog] = useState(false);
    type=type.toLowerCase()
    return(
        <div>
            <div  onClick={() => setShowEditDialog(true)} className=" max-w-6/6 text-lg rounded-full bg-orange-200 hover:bg-orange-400 text-black transition duration-150 m-1 p-1">
                {entity.name}
            </div>
            <EditDialog show={showEditDialog} type={type ? type : "task"} entity={entity} handleClose={() => setShowEditDialog(false)} updateTasks={updateTasks}/>
        </div>
    )
}

export default Badge;