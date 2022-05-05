import React, {useEffect, useState} from 'react'
import Container from './components/container/Container'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';
import Header from "./components/header/Header";



const App = () => {

    return(
    <DndProvider backend={HTML5Backend}>
        <Header />
        <div className={'middle'}>
            {/*<div className={'sidebar'}>sidebar</div>*/}
            <Container />
        </div>
    </DndProvider>
    )
}

export default App
