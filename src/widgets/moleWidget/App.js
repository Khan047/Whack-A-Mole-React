import React from "react";
import styled from "styled-components";
import GameLayout from "./GameLayout";
import './App.css';


function App() {
  return (
    <Main>
      <GameLayout />
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
   height: 100%;
   color :white;
    
`;

export default App;