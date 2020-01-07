import { Map } from 'immutable';
import { Stock } from '../enums/stock.enums';
import { REDUCE_STOCK } from '../actions/stock.action';

const initialState: any = Map({
  [Stock.tea]: 30,
  [Stock.coffee]: 30,
  [Stock.sugar]: 30,
  [Stock.milk]: 30,
});

export default (state = initialState, {type, payload}: any) => {
  switch(type) {
    case REDUCE_STOCK:
      const {itemName, quantity} = payload;
      let itemNumber = state.get(itemName);
      itemNumber -= quantity;
      return state.set(itemName, itemNumber);
    default:
      return state;
  }
}






