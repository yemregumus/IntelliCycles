import { useState } from "react";
import React from "react";
import EditDialog from "./EditForms/EditDialog"

// Function to calculate luminance and determine if a color is light or dark
const getContrastColor = (bgColor) => {
    // Remove the '#' if it's there
    bgColor = bgColor.replace('#', '');
    
    // Parse the r, g, b values
    const r = parseInt(bgColor.substr(0, 2), 16);
    const g = parseInt(bgColor.substr(2, 2), 16);
    const b = parseInt(bgColor.substr(4, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black for light backgrounds and white for dark backgrounds
    return luminance > 0.5 ? 'black' : 'white';
};

const Badge = ({ type, entity, updateTasks }) => {
    const [showEditDialog, setShowEditDialog] = useState(false);
    type = type.toLowerCase();

    const badgeStyle = {
        backgroundColor: entity.color,
        color: getContrastColor(entity.color)
        
    };

    return (
        <div>
            <div
                onClick={() => setShowEditDialog(true)}
                className={`max-w-6/6 text-lg border-1 rounded-full hover:border-red-500 transition duration-150 m-1 p-1`}
                style={badgeStyle}
            >
                {entity.name}
            </div>
            <EditDialog
                show={showEditDialog}
                type={type ? type : "task"}
                entity={entity}
                handleClose={() => setShowEditDialog(false)}
                updateTasks={updateTasks}
            />
        </div>
    );
};

export default Badge;
