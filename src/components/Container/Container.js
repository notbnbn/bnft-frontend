import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Button from './Button';
import ResolutionSelection from './ResolutionSelection.js';
import BnftLogo from "../BnftLogo";
import { useSelector } from "react-redux";
import data from '../../colors.json';
import { exportAsImage } from "./ExportAsImage";

function getColor(index) {
  // // Generate a random number between 0 and 16777215
  // const randomColor = Math.floor(Math.random() * 16777215);

  // // Convert the number to a 6-digit hex string
  // const hexColor = randomColor.toString(16).padStart(6, '0');

  // // Return the hex color string with a leading '#' character
  // return `#${hexColor}`;

  // console.log(data[index]['hex']);

  return "#" + data[index]['hex'];
}

const SquareImage = () => {
  const [insideColor, setInsideColor] = useState("#2f81f7");
  const [outlineColor, setOutlineColor] = useState("#161b22");
  const [bgColor, setBgColor] = useState("White");
  const svgRef = useRef();
  const userId = useSelector((state) => state.user.id);

  const lastSixDigitsId = userId.substring(userId.length - 6);

  const bgIndex = parseInt(lastSixDigitsId.substring(0, 2)); // first two digits

  const outlineIndex = parseInt(lastSixDigitsId.substring(2, 4)); // second and third digits

  const fillColorIndex = parseInt(lastSixDigitsId.substring(4, 6)); // last two digits

  const handleClick = () => {
    console.log("clicked"); 

    setBgColor(getColor(bgIndex));
    setOutlineColor(getColor(outlineIndex));
    setInsideColor(getColor(fillColorIndex));
  };

  useEffect(()=> {

  },[insideColor, outlineColor, bgColor]);

  
  return (
    <Container>
      <Square>
        <div ref={svgRef}>
          <BnftLogo id="downloadable-component" length="40vh" color={insideColor} outlineColor={outlineColor} bgColor={bgColor}/>
        </div>
        <ResolutionSelection/>
        <Button content="Generate" color="blue" func={() => handleClick()}/>
        <Button content="Download" color="green" func={() => exportAsImage(svgRef.current,"test")}/>
      </Square>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Square = styled.div`
  width: 70vh;
  height: 70vh;
  border-radius: 20px;
  background-color: purple;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default SquareImage;