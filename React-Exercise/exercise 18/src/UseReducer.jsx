


export const initialState = [];

const UseRreducer = (state, action) => {

  switch (action.type) {

    case 'add':
      return [...state, action.payload];

    case 'delete':
      return state.filter(item => item.id !== action.payload);

    case 'toggle':
      return state.map(item =>
        item.id === action.payload
          ? { ...item, favorite: !item.favorite}
          : item
      );

    case 'edit':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, ...action.payload }
          : item
      );

    default:
      return state;
  }
};

export {UseRreducer};

 
