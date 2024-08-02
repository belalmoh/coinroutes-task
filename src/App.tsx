import { useEffect, useState } from 'react';

import useCoinbase from './hooks/useCoinbase';

import Header from './components/Header';
import Offer from './components/Offer';
import PriceChart from './components/PriceChart';
import OrderBook from './components/OrderBook';
import FlexContainer from './components/FlexContainer';

const CoinbaseWebSocket = () => {
	const [productId, setProductId] = useState('BTC-USD');
	const { topOffBook, bestAsk, bestBid, error } = useCoinbase(productId);

	return (
		<div>
			<Header />

			{/* Selecting the product */}
			<div className='flex px-8 my-8 flex-col'>
				<div className='flex-1'>
					<label className='p-2'>Select Product:</label>
					<select
						className='border border-gray-300 rounded-lg p-2'
						onChange={(e) => setProductId(e.target.value)}
					>
						<option value='BTC-USD'>BTC-USD</option>
						<option value='ETH-USD'>ETH-USD</option>
						<option value='LTC-USD'>LTC-USD</option>
						<option value='BCH-USD'>BCH-USD</option>
					</select>
				</div>
				{error?.type === 'error' && <p className='flex-1 text-red-600 text-xl'>{error?.message} | {error?.reason}</p>}
			</div>

			{/* Showing the best offers for both Bids and Asks */}
			<FlexContainer>
				<div className='flex-1 w-full md:w-1/2'>
					<Offer stockName={productId} stockPrice={Number(bestBid[0])} stockQuantity={Number(bestBid[1])} offerType='bid'/>
				</div>

				<div className='flex-1 w-full md:w-1/2 mt-8 md:mt-0'>
					<Offer stockName={productId} stockPrice={Number(bestAsk[0])} stockQuantity={Number(bestAsk[1])} offerType='ask'/>
				</div>
			</FlexContainer>
			
			<FlexContainer>
				<div className='flex-initial w-full md:w-1/2'>
					{/* Orderbook that has the bids/asks ladder view */}
					<OrderBook topOffBook={topOffBook} bestAsk={Number(bestAsk[0])} bestBid={Number(bestBid[0])} currency={productId.split('-')[1]} />
				</div>

				<div className='flex-initial w-full md:w-1/2 mt-8 md:mt-0'>
					{/* Showing the price charts for both bids and asks over time */}
					<PriceChart productId={productId} topOffBook={topOffBook} />
				</div>
			</FlexContainer>

		</div>
	);
};

export default CoinbaseWebSocket;
