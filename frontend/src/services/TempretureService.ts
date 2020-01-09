import { ApiService } from './ApiService';
import { MACHINE_CONFIG } from '../config/machine.config';

export class TempretureService {
  private static interval : any;
  
  static start() {
    this.interval = setInterval(this.sendTempreture.bind(this), MACHINE_CONFIG.tempretureInterValTime);
  }

  static stop() {
    clearInterval(this.interval);
  }

  static sendTempreture() {
    ApiService.postTemperature({
      machine_id: MACHINE_CONFIG.id,
      timestamp: (+(new Date()) + '') ,
      temperature: this.getTempreature() + '',
    }).then(res => {
      console.log('tempreture post response', res);
    }).catch(e => {
      console.error(e);
    })
  }

  static getTempreature() {
    // simulate the tempreature
    return 90 + Math.round(Math.random() * 10);
  }
}