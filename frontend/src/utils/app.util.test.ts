import { AppUtil } from './app.util';
import { Map } from 'immutable';

describe.only('test util', () => {
  it('getLowerStockInfo', () => {
    let stock = Map({
      tea: 30,
      coffee: 24,
    });

    expect(AppUtil.getLowerStockInfo(stock)).toBe('Amount of coffee is low');

    stock = Map({
      tea: 24,
      coffee: 24,
    });

    expect(AppUtil.getLowerStockInfo(stock)).toBe('Amount of coffee,tea are low');
  });
})