import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

class NotificationService {
  static sub(eventName: string, callback: any) {
    eventEmitter.on(eventName, callback);
  }

  static pub(eventName: string, data: any) {
    eventEmitter.emit(eventName, data);
  }

  static remove(eventName: string, fn: any) {
    eventEmitter.removeListener(eventName, fn);
  }
}

export default NotificationService;
