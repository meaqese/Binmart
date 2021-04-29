import React, {useEffect, useState} from "react";
import {HStack, Skeleton, Tag, TagCloseButton, TagLabel} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {fetchGoods, fetchTags} from "../../store/api-actions";
import {capitalize} from "../../utils";


const Filter = () => {
  const {isTagsLoaded, isGoodsLoaded, tags} = useSelector((state) => state.DATA);
  const [selectedTags, selectTag] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isTagsLoaded) {
      dispatch(fetchTags());
    }
  }, [isTagsLoaded]);

  useEffect(() => {
    if (isGoodsLoaded) {
      dispatch(fetchGoods(selectedTags));
    }
  }, [selectedTags]);

  if (!isTagsLoaded) {
    return <Skeleton height="20px"/>
  }

  const handleSelectTag = (name) => {
    if (!selectedTags.includes(name)) {
      selectTag((last) => last.concat(name))
    } else {
      selectTag((last) => {
        const tagIndex = last.indexOf(name);
        return last.slice(0, tagIndex).concat(last.slice(tagIndex + 1))
      });
    }
  }

  return <HStack spacing={4} display="flex" flexWrap="wrap">
    {tags.map(({id, name}) => {
      const capitalizedName = capitalize(name);
      return <Tag cursor={`pointer`} size={`md`} key={id} colorScheme="bluePurple" style={{color: `white`}}
           onClick={() => handleSelectTag(name)}>
        {(selectedTags.includes(name)) ? <><TagLabel>{capitalizedName}</TagLabel><TagCloseButton/></> : capitalizedName}
      </Tag>
    })}
  </HStack>
};

export default Filter;
