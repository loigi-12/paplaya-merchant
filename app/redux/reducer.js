import * as actions from "../redux/actionTypes";

const INITIAL_STATE = {
  merchant: "",
  products: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_PRODUCTS:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case actions.ADD_MERCHANT:
      return {
        ...state,
        products: [...state.merchant, action.payload],
      };

    default:
      return state;
  }
}
