import { HttpService } from './HttpService';

export class ApiService {
  static getTemperature() {
    return HttpService.get(this.getPath('api/temperature'));
  }

  static postTemperature(data: any) {
    return HttpService.post(this.getPath('api/temperature'), data);
  }

  static postLowStockAlert(data: any) {
    return HttpService.post(this.getPath('api/lowstockalert'), data);
  }

  static getPath(path: string): string {
    return `http://localhost:4000/${path}`;
  }
}
