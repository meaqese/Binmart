import {createReducer} from "@reduxjs/toolkit";
import {addGood, clearUserGoods, deleteGood, loadGoods, loadTags, loadUserGoods} from "../../action";

const initialState = {
  goods: [],
  tags: [],
  userGoods: [],
  isGoodsLoaded: false,
  isTagsLoaded: false,
  isUserGoodsLoaded: false
};

export const data = createReducer(initialState, (builder) => {
  builder.addCase(loadGoods, (state, action) => {
    state.goods = action.payload;
    state.isGoodsLoaded = true;
  });
  builder.addCase(loadTags, (state, action) => {
    state.tags = action.payload;
    state.isTagsLoaded = true;
  });
  builder.addCase(loadUserGoods, (state, action) => {
    state.userGoods = action.payload;
    state.isUserGoodsLoaded = true;
  });
  builder.addCase(clearUserGoods, (state, action) => {
    state.userGoods = [];
    state.isUserGoodsLoaded = false;
  });
  builder.addCase(deleteGood, (state, action) => {
    const goodIndex = state.userGoods.findIndex(({id}) => id === action.payload.id);

    if (goodIndex > -1) {
      state.userGoods = state.userGoods.slice(0, goodIndex).concat(state.userGoods.slice(goodIndex + 1));
    }
  });
  builder.addCase(addGood, (state, action) => {
    state.userGoods = state.userGoods.concat(action.payload);
  });
});
