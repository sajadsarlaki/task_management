import React, {useState} from "react";
const Column = ({isOver, children}) => {
    const className = isOver ? "highlight-region":"";

    return(
        <div className="column">
            {children}
        </div>
    )
}

export default Column;
