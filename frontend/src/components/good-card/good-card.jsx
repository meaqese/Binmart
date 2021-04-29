import React from "react";
import PropTypes from 'prop-types';
import GoodProp from './good-card.prop';
import {Tag, Box, Flex, Heading, Text} from "@chakra-ui/react";
import styled from "@emotion/styled";

const CardBox = styled(Box)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  
  border-width: 2px;
  margin-bottom: 10px;
  
  min-width: 320px;
  width: 390px;
  
  cursor: pointer;
`;

const GoodCard = ({good: {name, price, tags}, onClick}) => {
  return <CardBox borderRadius="lg" marginRight="2"  p="5" onClick={onClick}>
    <Flex justifyContent="space-between" alignItems="baseline" marginBottom="7">
      <Heading as="h3" fontWeight="normal" fontSize="23" marginRight="10">{name}</Heading>
      <Text fontSize="23" wordBreak="no-break">{price} &#x20bd;</Text>
    </Flex>
    <Flex>
      {tags.map(({id, name}) => <Tag px="2" marginRight="2" borderRadius="md" key={id}>{name}</Tag>)}
    </Flex>
  </CardBox>
};

GoodCard.propTypes = {
  good: GoodProp.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GoodCard;


