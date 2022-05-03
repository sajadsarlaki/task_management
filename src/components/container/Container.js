import React, { useState } from 'react'
import './container.scss'



const Container = () => {
    return(
        <div className="page">
            <div className="page__mainPanel"></div>
            <div className="page__leftSidebar"></div>
            <div className="page__rightSidebar"></div>
        </div>
    )
}

export default Container
