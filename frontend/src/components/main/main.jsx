import React from 'react';
import Header from "../header/header";
import Filter from "../filter/filter";
import styled from "@emotion/styled";
import {Divider} from "@chakra-ui/react";
import GoodList from "../good-list/good-list";


const CenteredMain = styled.main`
  max-width: 1440px;
  padding: 0 20px;
  
  margin: 20px auto;
`;


const Main = () => {
  return <>
    <Header/>
    <CenteredMain>
      <Filter/>
      <Divider style={{width: 200, margin: `20px auto`, borderBottomWidth: 2}}/>
      <GoodList/>
    </CenteredMain>
  </>;
};

export default Main;
