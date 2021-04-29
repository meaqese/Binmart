import React, {useState} from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal, ModalBody, ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Text
} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";
import {WALLET} from "../../const";
import {checkPay} from "../../store/api-actions";
import {setError} from "../../store/action";

const Balance = () => {
  const dispatch = useDispatch();
  const {errors} = useSelector((state) => state.PROCESSES);
  const {authInfo} = useSelector((state) => state.USER);
  const [wallet, setWallet] = useState(``);
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(100);
  const [comment] = useState(`${authInfo.username}[${nanoid(10)}]`);

  const handleCheck = () => {
    dispatch(checkPay(comment, amount));
  };

  if (errors.pay) {
    setIsOpen(false);
    dispatch(setError({errorType: `pay`, errorData: false}));
  }

  return <Box borderRadius="lg" borderWidth="1px" p="3">
    <Heading as="h2" fontSize="20px" mb="3">Withdraw/Top Up money</Heading>

    <Flex justify="space-between">
      <FormControl display="flex" justifyContent="space-between" alignItems="baseline" mr="2" isDisabled={authInfo.balance < 100}>
        <FormLabel>Qiwi</FormLabel>
        <Input placeholder="+79812345611" minWidth="120px" onChange={(evt) => setWallet(evt.target.value)}/>
      </FormControl>

      {(wallet.length > 0) ? <Button>Withdraw</Button> :
          <Button onClick={() => setIsOpen(true)}>Top-Up</Button>
        }
    </Flex>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Top-up the balance</ModalHeader>
        <ModalBody>
          <Flex justify="space-between" align="baseline">
            <Text>Amount</Text>
            <Input type="number" placeholder="100" width="100px" onChange={(evt) => setAmount(evt.target.value)}/>
          </Flex>

          <Flex justify="space-between" align="baseline" mt="5">
            <Text fontWeight="bold">Wallet</Text>
            <Text>{WALLET}</Text>
          </Flex>
          <Flex justify="space-between" align="baseline">
            <Text fontWeight="bold">Amount</Text>
            <Text>{amount}</Text>
          </Flex>
          <Flex justify="space-between" align="baseline">
            <Text fontWeight="bold">Comment</Text>
            <Text>{comment}</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCheck}>Check!</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Box>;
};


export default Balance;
