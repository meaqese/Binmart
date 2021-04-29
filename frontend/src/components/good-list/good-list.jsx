import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {
  Button,
  Flex,
  Modal,
  ModalBody, ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text
} from "@chakra-ui/react";
import GoodCard from "../good-card/good-card";
import {buyGood, fetchGoods} from "../../store/api-actions";



const GoodList = () => {
  const {authInfo} = useSelector((state) => state.USER);
  const {isGoodsLoaded, goods} = useSelector((state) => state.DATA);
  const {boughtData} = useSelector((state) => state.PROCESSES);
  const [currentGood, setCurrentGood] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isGoodsLoaded) {
      dispatch(fetchGoods());
    }
  }, [isGoodsLoaded])
  if (!isGoodsLoaded) {
    return <Flex justifyContent="space-between" flexWrap="wrap">
      {[...Array(10).keys()].map((value) => <Skeleton key={value} height="120px" width="390px" mb="10px"/>)}
    </Flex>;
  }

  const handleClickGood = (good) => {
    setCurrentGood(good);
    setIsOpen(true);
  };

  const handleBuy = () => {
    dispatch(buyGood(currentGood.id));
  };

  const handleOnClose = () => setIsOpen(false);

  return <>
    <Flex justifyContent="space-between" flexWrap="wrap">
      {goods.map((value) => <GoodCard key={value.id} good={value} onClick={() => handleClickGood(value)}/>)}
    </Flex>
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalCloseButton/>
        <ModalHeader>📋 Buy &quot;{currentGood.name}&quot;</ModalHeader>
        <ModalBody>
          <Flex justify="space-between" alignItems="baseline">
            <Text fontWeight="bold">Price</Text>
            <Text>{currentGood.price} ₽</Text>
          </Flex>
          <Flex justify="space-between" alignItems="baseline">
            <Text fontWeight="bold">Your balance after</Text>
            <Text>{authInfo.balance - currentGood.price} ₽</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          {(boughtData.id === currentGood.id) ? <Flex justify="space-between" alignItems="baseline" width="100%">
                <Text fontWeight="bold" mr="4">Bought data</Text>
                <Text wordBreak="break-all">{boughtData.data}</Text>
              </Flex> :
          <Button colorScheme="bluePurple" disabled={(authInfo.balance - currentGood.price) < 0} onClick={handleBuy}>Buy it!</Button>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>;
};


export default GoodList;

