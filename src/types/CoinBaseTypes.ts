

interface CoinbaseL2Update {
    type: 'l2update';
    product_id: string;
    changes: [string, string, string][];
    time: Date;
}
  
interface CoinbaseSnapshot {
    type: 'snapshot';
    product_id: string;
    bids: [string, string][];
    asks: [string, string][];
    time: Date;
}

interface CoinbaseError {
    type: 'error';
    message: string;
    reason: string;
}

interface TopOffBook {
    bids: [string, string, Date][];
    asks: [string, string, Date][];
}
  
type CoinbaseMessage = CoinbaseL2Update | CoinbaseSnapshot | CoinbaseError;  

export type { CoinbaseMessage, CoinbaseError, TopOffBook };