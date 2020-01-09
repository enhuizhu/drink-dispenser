import { AppUtil } from './app.util';
import { Map } from 'immutable';

describe('test util', () => {
  it('getLowerStockInfo', () => {
    let stock = Map({
      tea: 30,
      coffee: 24,
    });

    expect(AppUtil.getLowerStockInfo(stock, 25)).toBe('Amount of coffee is low.');

    stock = Map({
      tea: 24,
      coffee: 24,
    });

    expect(AppUtil.getLowerStockInfo(stock, 25)).toBe('Amount of tea,coffee are low.');
  });
})