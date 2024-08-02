import { TopOffBook } from "../types/CoinBaseTypes";

export const getOrderBook = (topOffBook: TopOffBook, aggregate: number) => {
    const aggregatedBook = {
        bids: {} as { [key: number]: number },
        asks: {} as { [key: number]: number }
    };

    topOffBook.bids.forEach(([price, size, time]) => {
        const aggregatedPrice = (Math.floor(parseFloat(price) / aggregate) * aggregate);

        if (!aggregatedBook.bids[aggregatedPrice]) {
            aggregatedBook.bids[aggregatedPrice] = 0;
        }
        aggregatedBook.bids[aggregatedPrice] += parseFloat(size);
    });

    topOffBook.asks.forEach(([price, size, time]) => {
        const aggregatedPrice = (Math.floor(parseFloat(price) / aggregate) * aggregate);

        if (!aggregatedBook.asks[aggregatedPrice]) {
            aggregatedBook.asks[aggregatedPrice] = 0;
        }
        aggregatedBook.asks[aggregatedPrice] += parseFloat(size);
    });

    return {
        bids: Object.entries(aggregatedBook.bids).map(([price, quantity]) => ({ price: parseFloat(price), quantity })),
        asks: Object.entries(aggregatedBook.asks).map(([price, quantity]) => ({ price: parseFloat(price), quantity }))
    }
}

