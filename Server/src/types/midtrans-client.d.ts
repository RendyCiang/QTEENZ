// src/types/midtrans-client.d.ts

declare module "midtrans-client" {
  export class Snap {
    constructor(config: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });

    createTransaction(transactionDetails: any): Promise<any>;
  }
}
