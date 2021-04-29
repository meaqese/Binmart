import React, {useEffect} from "react";
import {useHistory} from 'react-router-dom';
import Header from "../header/header";
import styled from "@emotion/styled";
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Thead,
  Tr,
  Th,
  Box,
  IconButton,
  Tag,
  HStack,
  Heading, Flex, Text, FormControl, FormLabel, Input, Button, Tooltip, Skeleton
} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";
import AddGood from "../add-good/add-good";
import {useDispatch, useSelector} from "react-redux";
import {deleteMyGood, fetchUserGoods} from "../../store/api-actions";
import Balance from "../balance/balance";

const CenteredMain = styled.main`
  max-width: 1440px;
  padding: 0 20px;
  
  margin: 20px auto;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const {isAuthorized, authInfo} = useSelector((state) => state.USER);
  const {isUserGoodsLoaded, userGoods} = useSelector((state) => state.DATA);
  const history = useHistory();

  if (!isAuthorized) {
    history.push(`/`);
  }

  useEffect(() => {
    if (!isUserGoodsLoaded) {
      dispatch(fetchUserGoods());
    }
  }, [isUserGoodsLoaded]);

  const handleDelete = (id) => {
    dispatch(deleteMyGood(id));
  };

  return <>
    <Header logoAsLink={true}/>
    <CenteredMain>
      <HStack mb="3" spacing="3" alignItems="stretch">
        <Box borderRadius="lg" borderWidth="1px" p="3">
          <Heading as="h2" fontSize="20px" mb="3">{authInfo.username}&apos;s account</Heading>

          <Flex width="300px" justify="space-between">
            <Text>Balance</Text>
            <Text fontWeight="bold">{authInfo.balance}</Text>
          </Flex>
          <Flex width="300px" justify="space-between">
            <Text>Goods Count</Text>
            {isUserGoodsLoaded ? <Text fontWeight="bold">{userGoods.length}</Text> : <Skeleton height="20px" width="10px"/>}
          </Flex>
        </Box>
        <Balance/>

        <AddGood/>
      </HStack>
      <Box borderRadius="lg" borderWidth="1px">
        <Table variant="simple">
        <TableCaption>Your goods</TableCaption>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Tags</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isUserGoodsLoaded && userGoods.map(({id, name, price, tags}) => <Tr key={id}>
            <Td>{id}</Td>
            <Td>{name}</Td>
            <Td>{price}</Td>
            <Td>{tags.map(({id, name}) => <Tag key={id} mr="2px">{name}</Tag>)}</Td>
            <Td width="50px"><IconButton onClick={() => handleDelete(id)} aria-label="delete"><CloseIcon/></IconButton></Td>
          </Tr>)}
        </Tbody>
      </Table>
      </Box>
    </CenteredMain>
  </>
};


export default Profile;
