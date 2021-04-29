import React from "react";
import PropTypes from 'prop-types';
import {HStack, Input, Tag} from "@chakra-ui/react";
import {capitalize} from "../../utils";

const Tags = ({tags, tagsList, addTag}) => {
  const handleChange = (evt) => {
    const tagName = evt.target.value.toLowerCase();
    if (tags.includes(tagName) && tagsList.length < 3) {
      addTag((last) => {
        if (!tagsList.includes(tagName)) {
          evt.target.value = ``;
          return last.concat(tagName);
        }
        return last;
      });
    }
  }

  return <HStack width="400" borderWidth="1px" borderRadius="lg" pr="2" pl="2" spacing="2" size="lg">
    <HStack spacing="2">
      {tagsList.map((value) => <Tag key={value} minWidth="min-content">{capitalize(value)}</Tag>)}
    </HStack>
    {(tagsList.length < 3) &&
      <Input aria-label="tags" width="100px" borderWidth="0" outline="0" focusBorderColor="none" onChange={handleChange} placeholder="Tags..."/>
    }
  </HStack>
};

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  tagsList: PropTypes.array.isRequired,
  addTag: PropTypes.func.isRequired
};


export default Tags;
