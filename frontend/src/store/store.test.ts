import store from './store';
import { Stock} from './enums/stock.enums';
import { reduceStock } from './actions/stock.action';

describe('test store', () => {
  it('test stock reducer', () => {
    let stock = store.getState().stock;

    expect(stock.get(Stock.coffee)).toBe(30);
    expect(stock.get(Stock.milk)).toBe(30);
    expect(stock.get(Stock.sugar)).toBe(30);
    expect(stock.get(Stock.tea)).toBe(30);

    store.dispatch(reduceStock({
      itemName: Stock.coffee,
      quantity: 1
    }));
    
    stock = store.getState().stock;

    expect(stock.get(Stock.coffee)).toBe(29);
    expect(stock.get(Stock.milk)).toBe(30);
    expect(stock.get(Stock.sugar)).toBe(30);
    expect(stock.get(Stock.tea)).toBe(30);

    store.dispatch(reduceStock({
      itemName: Stock.milk,
      quantity: 1
    }));

    stock = store.getState().stock;

    expect(stock.get(Stock.coffee)).toBe(29);
    expect(stock.get(Stock.milk)).toBe(29);
    expect(stock.get(Stock.sugar)).toBe(30);
    expect(stock.get(Stock.tea)).toBe(30);

    store.dispatch(reduceStock({
      itemName: Stock.sugar,
      quantity: 1
    }));

    stock = store.getState().stock;

    expect(stock.get(Stock.coffee)).toBe(29);
    expect(stock.get(Stock.milk)).toBe(29);
    expect(stock.get(Stock.sugar)).toBe(29);
    expect(stock.get(Stock.tea)).toBe(30);

    store.dispatch(reduceStock({
      itemName: Stock.tea,
      quantity: 1
    }));

    stock = store.getState().stock;

    expect(stock.get(Stock.coffee)).toBe(29);
    expect(stock.get(Stock.milk)).toBe(29);
    expect(stock.get(Stock.sugar)).toBe(29);
    expect(stock.get(Stock.tea)).toBe(29);
  })
});