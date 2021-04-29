import { React } from 'react';
import { Global } from "@emotion/react";
import styled from "@emotion/styled";

const StyledGlobal = styled(Global)`
  @font-face {
    font-family: 'Monoton';
    src: url('./fonts/Monoton-Regular.woff2') format('woff2'),
          url('./fonts/Monoton-Regular.woff') format('woff'),
          url('./fonts/Monoton-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
`;

const Fonts = () => {
  return <StyledGlobal/>
};

export default Fonts;
