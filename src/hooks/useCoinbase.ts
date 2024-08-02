import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

import { getAuthHeaders, getOrderBook } from "../utils";
import { CoinbaseMessage, CoinbaseError, TopOffBook } from "../types/CoinBaseTypes";

const useCoinbase = (productId: string) => {
    // will be taken from the .env file
    const socketUrl = process.env.REACT_APP_SOCKET_URL || '';

	// (bids | asks)[0] -> price 
	// (bids | asks)[1] -> size
    const [topOffBook, setTopOffBook] = useState<TopOffBook>({ bids: [], asks: [] });
	
	const [error, setError] = useState<CoinbaseError>();
	const [connect, setConnect] = useState(true);

    const authHeaders = getAuthHeaders();
    const coinbaseSubRequestParams = {
        type: 'subscribe',
        channels: ['level2'],
        product_ids: [productId],
        signature: authHeaders['CB-ACCESS-SIGN'],
        key: authHeaders['CB-ACCESS-KEY'],
        passphrase: authHeaders['CB-ACCESS-PASSPHRASE'],
        timestamp: authHeaders['CB-ACCESS-TIMESTAMP'],
    };

	const coinbaseUnSubRequestParams = {
        type: 'unsubscribe',
        channels: ['level2'],
        product_ids: [productId],
        signature: authHeaders['CB-ACCESS-SIGN'],
        key: authHeaders['CB-ACCESS-KEY'],
        passphrase: authHeaders['CB-ACCESS-PASSPHRASE'],
        timestamp: authHeaders['CB-ACCESS-TIMESTAMP'],
    };

    const { sendMessage, lastMessage, lastJsonMessage } = useWebSocket<CoinbaseMessage>(socketUrl, {
		onOpen: () => {
			sendMessage(JSON.stringify(coinbaseSubRequestParams));		
		}
  	}, connect);

    useEffect(() => {
        return () => {
            sendMessage(JSON.stringify(coinbaseSubRequestParams));
        }
    }, []);

    useEffect(() => {
		if(lastJsonMessage !== null && lastJsonMessage.type === 'error') {
			setError(lastJsonMessage);
			setTopOffBook({ bids: [['0','0', new Date()]], asks: [['0', '0', new Date()]] });
		} else {
			if (lastJsonMessage !== null && lastJsonMessage.type === 'snapshot') {
				const updatedTopOffBook = {
					bids: lastJsonMessage.bids.map(([price, size]) => [price, size, new Date(lastJsonMessage.time)]) as [string, string, Date][],
					asks: lastJsonMessage.asks.map(([price, size]) => [price, size, new Date(lastJsonMessage.time)]) as [string, string, Date][],
				};
	
				setTopOffBook(updatedTopOffBook);
				setError(undefined);
	
			} else if (lastJsonMessage !== null && lastJsonMessage.type === 'l2update') {
				const currentBids = [...topOffBook.bids];
				const currentAsks = [...topOffBook.asks];
	
				lastJsonMessage.changes.forEach(([side, price, size]) => {
					if (side === 'buy') {
						const bidIndex = currentBids.findIndex(bid => bid[0] === price);
						if (bidIndex > -1) {
							if (size === '0') {
								currentBids.splice(bidIndex, 1);
							} else {
								currentBids[bidIndex] = [price, size, new Date(lastJsonMessage.time)];
							}
						} else {
							currentBids.push([price, size, new Date(lastJsonMessage.time)]);
						}
					} else if (side === 'sell') {
						const askIndex = currentAsks.findIndex(ask => ask[0] === price);
						if (askIndex > -1) {
							if (size === '0') {
								currentAsks.splice(askIndex, 1);
							} else {
								currentAsks[askIndex] = [price, size, new Date(lastJsonMessage.time)];
							}
						} else {
							currentAsks.push([price, size, new Date(lastJsonMessage.time)]);
						}
					}
				});
	
				const updatedTopOffBook = {
					bids: currentBids, // sort after biddings updates descendengly (seller want to sell at the highest price)
					asks: currentAsks, // sort after asks updates ascendengly (buyer want to buy at the lowest price)
				};
	
				setTopOffBook(updatedTopOffBook);
		} 
        }
    }, [lastJsonMessage]);

    useEffect(() => {
		
        sendMessage(JSON.stringify(coinbaseSubRequestParams));

        return () => sendMessage(JSON.stringify(coinbaseUnSubRequestParams));
  	}, [sendMessage, productId]);
    
    return {
        topOffBook,
		bestBid: topOffBook.bids.length > 0 ? topOffBook.bids.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))[0] : [0,0, new Date()],
		bestAsk: topOffBook.asks.length > 0 ? topOffBook.asks.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))[0] : [0,0, new Date()],
		error
    }
}

export default useCoinbase;