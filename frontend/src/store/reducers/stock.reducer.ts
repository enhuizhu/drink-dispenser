import { Map } from 'immutable';
import { Stock } from '../enums/stock.enums';
import { REDUCE_STOCK } from '../actions/stock.action';
import NotificationService from '../../services/NotificationService';
import { WARNING, NOTIFICATION } from '../../constants/notification.constant';
import { AppUtil } from '../../utils/app.util';
import { MACHINE_CONFIG } from '../../config/machine.config';
import { ApiService } from '../../services/ApiService';

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

      const newState = state.set(itemName, itemNumber);

      if (itemNumber < 25) {
        NotificationService.pub(NOTIFICATION, {
          msg: AppUtil.getLowerStockInfo(newState, MACHINE_CONFIG.limit),
          msgType: WARNING
        });

        // need to send info to api
        ApiService.postLowStockAlert({
          machine_id: MACHINE_CONFIG.id,
          timestamp: +(new Date()) + '',
          stock: AppUtil.getLowerStockRequestPayload(newState, MACHINE_CONFIG.limit),
        }).then(res => {
          console.log('lower stock response', res);
        }).catch(console.error);
      }

      return newState;
    default:
      return state;
  }
}






