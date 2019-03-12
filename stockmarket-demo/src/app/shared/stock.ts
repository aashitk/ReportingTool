
export class StockDetails {
  ticker: string;
  price: number;
  lastUpdated: Date;
  dateFormat : DATE_TYPE;
  status : STATUS_CODE;

  constructor() {
    this.ticker = '';
    this.price = 0;
    this.status = STATUS_CODE.NEW;
    this.dateFormat = DATE_TYPE.NONE;
  };
}

export enum STATUS_CODE {
  HIGH,
  LOW,
  NEW
}

export enum DATE_TYPE {
  MEDIUM,
  SHORT,
  NONE
}