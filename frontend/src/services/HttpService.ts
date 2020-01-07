import { isObject } from 'lodash';

export class HttpService {
  static get(path: string) {
    return this.send('GET', path);
  }

  static post(path: string, data = null) {
    return this.send('POST', path, data);
  }

  static put(path: string, data = null) {
    return this.send('PUT', path, data)
  }

  static delete(path: string) {
    return this.send('DELETE', path);    
  }

  static send(method: string, path: string, data = null) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    const request = new Request(path, {
      method,
      headers,
      body: isObject(data) ? JSON.stringify(data) : data,
    });
    
    return fetch(request).then(response => {
      return response.json();
    });
  }
}