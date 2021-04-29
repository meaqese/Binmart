import React from 'react';
import {Link} from "react-router-dom";
import {
  Box, Button,
  ButtonGroup,
  Heading,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import Login from "../login/login";
import Register from "../register/register";
import ModalForm from "../modal-form/modal-form";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/api-actions";


const HeaderBox = styled(Box)`
  border-bottom: 2px solid #AEADF0;
  width: 100%;
`;

const CenterContainer = styled.div`
  max-width: 1440px;
  min-height: 60px;
  padding: 0 20px;
  
  margin: auto;
  
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Header = ({logoAsLink = false}) => {
  const {isAuthorized} = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <HeaderBox>
    <CenterContainer>
      {logoAsLink ? <Link to="/">
        <Heading fontFamily="Monoton, sans-serif" fontWeight="normal">Binmart</Heading>
      </Link>: <Heading fontFamily="Monoton, sans-serif" fontWeight="normal">Binmart</Heading>}
      <form action="/" method="get" style={{width: `50%`, minWidth: 300}}>
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none"><SearchIcon/></InputLeftElement>
          <Input colorScheme="bluePurple" type="text" placeholder="Search..."/>
        </InputGroup>
      </form>
      {!isAuthorized ?
        <ButtonGroup>
          <ModalForm render={(props) => <Login {...props}/>}/>
          <ModalForm render={(props) => <Register {...props}/>}/>
        </ButtonGroup> :
        <ButtonGroup>
          <Link to="/profile">
            <Button colorScheme="bluePurple">Profile</Button>
          </Link>
          <Button colorScheme="bluePurple" onClick={handleLogout}>Logout</Button>
        </ButtonGroup>
      }
    </CenterContainer>
  </HeaderBox>;
};

Header.propTypes = {
  logoAsLink: PropTypes.bool
};


export default Header;


