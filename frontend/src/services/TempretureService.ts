import { ApiService } from './ApiService';
import { MACHINE_CONFIG } from '../config/machine.config';

export class TempretureService {
  private static interval : any;
  private static timeInterval = 1000;
  
  static start() {
    this.interval = setInterval(this.sendTempreture.bind(this), this.timeInterval);
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
      console.log('---- tempreture has been sent to server successfully! ---');
    }).catch(e => {
      console.error(e);
    })
  }

  static getTempreature() {
    // simulate the tempreature
    return 90 + Math.round(Math.random() * 10);
  }
}