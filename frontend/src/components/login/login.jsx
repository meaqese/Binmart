import React, {useRef, useState} from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter, FormControl, FormLabel, Input, InputGroup, InputRightElement, FormErrorMessage
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/api-actions";


const Login = ({isOpen, setIsOpen, handleClose, isShowPwd, handleShow}) => {
  const dispatch = useDispatch();

  const {errors} = useSelector((state) => state.PROCESSES);

  const loginRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(login(loginRef.current.value, passwordRef.current.value));
  };

  return <>
    <Button colorScheme="bluePurple" variant="outline" onClick={() => setIsOpen(true)}>Sign In</Button>

    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input placeholder="JohnDoe1337" ref={loginRef} isInvalid={errors.login}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input type={isShowPwd ? `text` : `password`} placeholder="31MySuperPassword73" pr="80px" ref={passwordRef} isInvalid={errors.login}/>
              <InputRightElement width="80px">
                <Button height="25px" size="sm" onClick={handleShow}>{isShowPwd ? `Hide` : `Show`}</Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleSubmit}>Let&apos;s go!</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
};

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  isShowPwd: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired
};

export default Login;
