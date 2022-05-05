import React, { useEffect, useState } from 'react';
import Container from './components/container/Container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/header/Header';

const App = () => {
  const [toVertical, setToVertical] = useState(false);
  const screenToVertical = () => {
    const content = document.querySelector('.content');
    const middle = document.querySelector('.middle');
    const btn = document.getElementById('direction-btn');
    if (toVertical) {
      content.style.display = 'flex';
      content.style.flexDirection = 'column';
      middle.style.paddingTop = '.1rem';
      middle.style.justifyContent = 'center';
      btn.innerText = '↔';
    } else {
      content.style.display = 'flex';
      content.style.flexDirection = 'row';
      middle.style.justifyContent = 'start';
      btn.innerText = '↕';
    }
    setToVertical(!toVertical);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      {/*<div className={'sidebar'}>sidebar</div>*/}
      <div
        id={'direction-btn'}
        onClick={screenToVertical}
        className={'btn-change-direction'}
      >
        {' '}
        ↕
      </div>

      <div className={'middle'}>
        <Container />
      </div>
    </DndProvider>
  );
};

export default App;
