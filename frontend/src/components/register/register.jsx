import React, {useRef, useState} from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter, FormControl, FormLabel, Input, InputGroup, InputRightElement
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../store/api-actions";


const Register = ({isOpen, setIsOpen, handleClose, isShowPwd, handleShow}) => {
  const [{password1, password2}, setPasswords] = useState({});
  const passwordsNotEqual = (password2 && password1 !== password2);
  const dispatch = useDispatch();

  const {errors} = useSelector((state) => state.PROCESSES);

  const usernameRef = useRef();

  const handleChangePassword = (evt, fieldName) => {
    setPasswords((last) => Object.assign({}, last, {[fieldName]: evt.target.value}))
  };

  const handleSubmit = () => {
    if (!passwordsNotEqual) {
      dispatch(register(usernameRef.current.value, password1, setIsOpen));
    }
  };

  return <>
    <Button colorScheme="bluePurple" onClick={() => setIsOpen(true)}>Sign Up</Button>

    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input placeholder="JohnDoe1337" ref={usernameRef} isInvalid={errors.register}/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input type={isShowPwd ? `text` : `password`} placeholder="31MySuperPassword73" pr="80px"
                       onChange={(evt) => handleChangePassword(evt, `password1`)}
                       isInvalid={passwordsNotEqual || errors.register}/>
                <InputRightElement width="80px">
                  <Button height="25px" size="sm" onClick={handleShow}>{isShowPwd ? `Hide` : `Show`}</Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password Repeat</FormLabel>
              <InputGroup size="md">
                <Input type={isShowPwd ? `text` : `password`} placeholder="31MySuperPassword73" pr="80px"
                       onChange={(evt) => handleChangePassword(evt, `password2`)}
                       isInvalid={passwordsNotEqual || errors.register}/>
                <InputRightElement width="80px">
                  <Button height="25px" size="sm" onClick={handleShow}>{isShowPwd ? `Hide` : `Show`}</Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleSubmit}>Let&apos;s go!</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
};

Register.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  isShowPwd: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired
};

export default Register;
