import React, { useState } from 'react'
import './App.scss'
import Container from './components/container/Container'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';
import Header from "./components/header/Header";


const App = () => {
    return(
    <DndProvider backend={HTML5Backend}>
         <Header/>
         <Container />
    </DndProvider>
    )
}

export default App
