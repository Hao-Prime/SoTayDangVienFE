import {
  GET_SOLUONG_THONGBAO
} from '../actions/SoLuongActions';

const initialState = {};

const SoLuongReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_SOLUONG_THONGBAO: {
      return { ...action.payload };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default SoLuongReducer;
