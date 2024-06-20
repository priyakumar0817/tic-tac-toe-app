import React from 'react';
import styled from 'styled-components';

const StyledSquare = styled.button`
  width: 100px;
  height: 100px;
  color: #F68E5F;
  cursor: pointer;
  border: 1px solid #1BA4AA;

  img { 
    width: 80%;
    height: 80%;
  }
`;

const Square = ({ value, onClick, isWinning }) => {
  
  return (
    <StyledSquare onClick={onClick} isWinning={isWinning}>
       {value && <img src={value} alt="player" />}
    </StyledSquare>
  );
};

export default Square;
