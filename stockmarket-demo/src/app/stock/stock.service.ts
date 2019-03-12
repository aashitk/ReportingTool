import {Observable} from 'rxjs';
import { StockDetails } from '../shared/stock';

export class WebSocketService{
   ws: WebSocket;

   createObservableSocket(url:string) : Observable<StockDetails>{
    this.ws = new WebSocket(url);
     return new Observable(observer =>{
      this.ws.onmessage = (event) => observer.next(event.data);
      this.ws.onerror = (event) => observer.error(event);
      this.ws.onclose = (event) => observer.complete();  
     })
    //.map(res => res.data)
    // .share();  

   }


}