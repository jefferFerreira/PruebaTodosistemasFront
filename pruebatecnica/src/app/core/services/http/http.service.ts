import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient {

  constructor(private httpHandler: HttpHandler) {
    super(httpHandler);
  }

  /**
   * Retrasa la resolucion de una Promise
   * @param obj Objeto que se desea resolver
   * @param delay Tiempo en milisegundos que se retrasa la resolucion de la promise
   */
  public delayedPromiseResolve(obj: any, delay: number): Promise<any> {
    return new Promise<any>((resolve) => {
      setTimeout(_ => resolve(obj), delay);
    });
  }

  /**
   * Ejecuta una peticion no tipada basada en el verbo de peticion pasado por parametro
   * @param method ('get' | 'post' | 'put' | 'delete') verbo de peticion
   * @param host (string) host pirncipal de la peticion
   * @param endpoint (string) url destino de la peticion
   * @param paramsHeader (any) parametros opcionales para el query string de la peticion
   * @param paramsBody (any) parametros para el body de la peticion
   * @param headers (any) parametros para el header de la peticion
   */
  public _request(method: 'get' | 'post' | 'put' | 'delete', host: string, endpoint: string, paramsHeader: any, paramsBody: any, headers: object = {}) {
    if (method === 'get') {
      return this._get(host, endpoint, paramsHeader, headers);
    }
    if (method === 'post') {
      if (typeof paramsBody === 'object' && Object.keys(paramsBody).length === 1) {
        paramsBody = paramsBody[Object.keys(paramsBody)[0]];
      }
      return this._post(host, endpoint, paramsHeader, paramsBody, headers);
    }
    if (method === 'put') {
      if (typeof paramsBody === 'object' && Object.keys(paramsBody).length === 1) {
        paramsBody = paramsBody[Object.keys(paramsBody)[0]];
      }
      return this._put(host, endpoint, paramsHeader, paramsBody, headers);
    }
    if (method === 'delete') {
      return this._delete(host, endpoint, paramsHeader, headers);
    }
  }

  /**
   * Realiza una peticion de tipo GET
   * @param host (string) host pirncipal de la peticion
   * @param endpoint (string) url destino de la peticion
   * @param params (any) parametros que se envian en el querystring de la peticion
   * @param headers (object) parametros para el header de la peticion
   */
  public _get(host: string, endpoint: string, params: any = {}, headers: object = {}) {

    return this.get(host + endpoint, {
      params: this.buildParams(params),
      headers: this.buildHeaders(headers)
    }).pipe(
      map(this.unserializeResponse)
    );
  }

  /**
   * Realiza una peticion de tipo POST
   * @param host (string) host pirncipal de la peticion
   * @param endpoint (string) url destino de la peticion
   * @param paramsHeader (object) parametros que se envian en el querystring de la peticion
   * @param params (any) parametros que se envian en el body de la peticion
   * @param headers (object) parametros para el header de la peticion
   */
  public _post(host: string, endpoint: string, paramsHeader: object, params: any, headers: object = {}) {
    return this.post(host + endpoint, params, {
      params: this.buildParams(paramsHeader),
      headers: this.buildHeaders(headers),
    }).pipe(
      map(this.unserializeResponse)
    );
  }

  /**
   * Realiza una peticion de tipo PUT
   * @param host (string) host pirncipal de la peticion
   * @param endpoint (string) url destino de la peticion
   * @param paramsHeader (object) parametros que se envian en el querystring de la peticion
   * @param params (any) parametros que se envian en el body de la peticion
   * @param headers (object) parametros para el header de la peticion
   */
  public _put(host: string, endpoint: string, paramsHeader: object, params: object, headers?: object) {
    return this.put(host + endpoint, params, {
      params: this.buildParams(paramsHeader),
      headers: this.buildHeaders(headers),
    }).pipe(
      map(this.unserializeResponse)
    );
  }

  /**
   * Metodo de peticion usando el verbo DELETE
   * @param host (string) host pirncipal de la peticion
   * @param endpoint (string) url destino de la peticion
   * @param params (any)
   * @param headers (object) parametros para el header de la peticion
   */
  public _delete(host: string, endpoint: string, params: any, headers: object = {}) {
    return this.delete(host + endpoint, {
      params: this.buildParams(params),
      headers: this.buildHeaders(headers),
    }).pipe(
      map(this.unserializeResponse)
    );
  }

  /**
   * Deserializa la respuesta de la peticion
   * @param resp (Response|any) Objeto de respuesta de la peticion
   */
  public unserializeResponse(resp: Response | any) {
    if (resp && typeof resp.json === 'function') {
      return resp.json() || {};
    }
    return resp;
  }

  /**
   * Construye los parametros que se van a enviar a en la peticion
   * @param params (any) Array de parametros que se enviaran en la peticion
   */
  private buildParams(params: any): HttpParams {
    let p = new HttpParams();
    for (const key of Object.keys(params)) {
      p = p.set(key, params[key]);
    }
    return p;
  }

  /**
   * Construye parametros personalizados para el header de la peticion
   * @param headers (any) array con los parametros para agregarle al header
   */
  public buildHeaders(headers: any): HttpHeaders {
    const customHeaders = {};
    return new HttpHeaders({ ...customHeaders, ...(headers || {}) });
  }

}
