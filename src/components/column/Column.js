import React  from "react";
import '../../App.scss'
const Column = ({isOver, children}) => {
    const className = isOver ? "highlight-region":"";
    return(
        <div className="column">
            {children}
        </div>

    )
}

export default Column;
