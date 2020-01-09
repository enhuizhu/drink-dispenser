export class AppUtil {
  static getLowerStockInfo(stock: any, limit: number) {
    const keys = stock.keySeq().toArray();
    const limitedItems: any = [];
    let msg = '';

    keys.forEach((key: any) => {
      const quantity = stock.get(key);

      if (quantity < limit) {
        if (msg === '') {
          msg += 'Amount of '
        }

        limitedItems.push(key);
      }
    });

    if (msg.length > 0 && limitedItems.length > 0) {
      msg += `${limitedItems.join(',')} `;
      msg += limitedItems.length > 1 ? 'are' : 'is';
      msg += ' low.';
    }

    console.log('msg', msg);
    
    return msg;
  }

  static getLowerStockRequestPayload(stock: any, limit: number) {
    const keys = stock.keySeq().toArray();
    const lowerStockItems: any = [];

    keys.forEach((key: any) => {
      const quantity = stock.get(key);

      if (quantity < limit) {
        lowerStockItems.push({
          product: key,
          stock: quantity,
        });
      }
    });

    console.log('items', lowerStockItems);

    return lowerStockItems;
  }
}