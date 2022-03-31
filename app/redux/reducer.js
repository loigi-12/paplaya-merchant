import * as actions from "../redux/actionTypes";

const INITIAL_STATE = {
  products: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_PRODUCTS:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    default:
      return state;
  }
}
