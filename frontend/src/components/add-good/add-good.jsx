import React, {useEffect, useRef, useState} from "react";
import {
  Box, Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Popover, PopoverCloseButton, PopoverContent, PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Tooltip
} from "@chakra-ui/react";
import {AddIcon, InfoIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {addNewGood, fetchTags} from "../../store/api-actions";
import Tags from "../tags/tags";



const AddGood = () => {
  const {isTagsLoaded, tags} = useSelector((state) => state.DATA);
  const [tagsList, addTag] = useState([]);
  const dispatch = useDispatch();

  const [goodData, setGoodData] = useState({});
  const [isInvalid, setIsInvalid] = useState({});

  const setIsInvalidLite = (fieldName, message) => {
    setIsInvalid((last) => Object.assign({}, last, {[fieldName]: message}));
  };

  const setGoodDataLite = (fieldName, data) => {
    setGoodData((last) => Object.assign({}, last, {[fieldName]: data}));
  };

  const handleAdd = () => {
    const nameIsValid = goodData.name.length <= 18;
    const priceIsValid = +goodData.price >= 10;

    if (!nameIsValid) {
      setIsInvalidLite(`name`, `Max 18 letters`);
    }
    if (!priceIsValid) {
      setIsInvalidLite(`price`, `Min price is 10 RUB`);
    }

    if (nameIsValid && priceIsValid) {
      const goodModel = {
        name: goodData.name,
        price: goodData.price,
        tags: tagsList,
        data: goodData.data
      };

      dispatch(addNewGood(goodModel));

      setIsInvalid({});
      addTag([]);
    }
  };

  useEffect(() => {
    if (!isTagsLoaded) {
      dispatch(fetchTags());
    }
  }, [isTagsLoaded]);

  if (!isTagsLoaded) {
    return <Skeleton height="108px" width="100%"/>
  }

  const tagsArray = tags.map(({name}) => name);

  return <Box width="100%" borderRadius="lg" borderWidth="1px" p="3">
    <Flex justify="space-between" alignItems="baseline">
      <Heading as="h2" fontSize="20px" mb="3">Add new good</Heading>
      <Tooltip label={`Tags: ` + tagsArray.join(`, `)} fontSize="lg">
        <InfoIcon/>
      </Tooltip>
    </Flex>
    <HStack spacing="2" alignItems="stretch">
      <Input placeholder="Windows 10 Pro key" aria-label="name of good" width="300" onChange={
        (evt) => setGoodDataLite(`name`, evt.target.value)}
             isInvalid={isInvalid.name}/>
      <Tags tags={tagsArray} tagsList={tagsList} addTag={addTag}/>
      <Input type="number" placeholder="120" aria-label="price" width="100px" onChange={
        (evt) => setGoodDataLite(`price`, evt.target.value)}
             isInvalid={isInvalid.price}/>

      <Popover>
        <PopoverTrigger>
          <IconButton aria-label="Add">
            <AddIcon/>
          </IconButton>
        </PopoverTrigger>
        <PopoverContent p="3">
          <Input placeholder="Enter text for sale" mb="2"  onChange={
            (evt) => setGoodDataLite(`data`, evt.target.value)}/>
          <Button onClick={handleAdd}>Finally add!</Button>
        </PopoverContent>
      </Popover>
    </HStack>
  </Box>;
};

export default AddGood;

