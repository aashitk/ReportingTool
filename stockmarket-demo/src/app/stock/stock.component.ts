
import { WebSocketService } from './stock.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockDetails, STATUS_CODE, DATE_TYPE } from '../shared/stock';
import { AppSettings } from '../shared/common-constants';


@Component({
  selector: '',
  templateUrl: './stock.component.html',
  providers: [WebSocketService]
})
export class StockComponent  {
   list: Array<StockDetails> = [];
   data :Array<StockDetails>;
   ws: WebSocket;

   constructor(private wsService : WebSocketService){
    this.wsService.createObservableSocket(AppSettings.webSocketURL)
      .subscribe(
        response =>{
          this.data = JSON.parse(response.toString());
          this.data.forEach(stock => {
            console.log(`${stock[0]}: ${stock[1]}`);
            this.mapStockDetails(stock);
          });
         },
        err => console.log(err)
      )
   }

   mapStockDetails = function(element : StockDetails){
    let repeatedItem = StockDetails;
    const stock: StockDetails = new StockDetails();
    stock.ticker = element[0];
    stock.price = element[1];
    repeatedItem = this.list.filter(
      data => data.ticker === stock.ticker);
    if(repeatedItem.length > 0){
        this.setStatusCode(stock, repeatedItem);
        this.setLastUpdatedDetails(repeatedItem);
        repeatedItem[0].price = stock.price;
    }
    else{
      this.list.push(stock);
    }
   }

   setStatusCode(stock : StockDetails, element: StockDetails){
    element[0].status = STATUS_CODE.LOW;
    if(stock.price > element[0].price){
      element[0].status = STATUS_CODE.HIGH;
    } 
   }

   getFormattedDate(date: Date){
     var fulldate,dd,mm,yy,hrs,minutes, seconds;
     dd = date.getDate();
     mm = date.getMonth() + 1;
     yy = date.getFullYear();
     return dd + " " + mm  + " " +yy
   }

   setLastUpdatedDetails(element: StockDetails){
    var date, oldDate,today, currentDate;
    currentDate = new Date();
    date = this.getFormattedDate(new Date());
    if (typeof(element[0].lastUpdated)  !== "undefined"){
      oldDate = this.getFormattedDate(new Date(element[0].lastUpdated));
      if(date == oldDate){
        element[0].dateFormat = DATE_TYPE.SHORT;
      } else{
        element[0].dateFormat = DATE_TYPE.MEDIUM;
       }
    }
    else{
      element[0].dateFormat = DATE_TYPE.SHORT;
    }
    element[0].lastUpdated = currentDate;   
   }
}