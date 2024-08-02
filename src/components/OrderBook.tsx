import { useEffect, useState } from "react";
import { TopOffBook } from "../types/CoinBaseTypes";
import { getOrderBook } from "../utils";

const OrderBook: React.FC<{
	topOffBook: TopOffBook;
	currency: string;
	bestBid: number;
	bestAsk: number;
}> = ({ topOffBook, currency, bestAsk, bestBid }) => {
	const aggregationsValues = [0.01, 0.05, 0.1, 0.5, 1.0, 2.5, 5.0, 10.0];

	const [orderBook, setOrderBook] = useState<{
		bids: { price: number; quantity: number }[];
		asks: { price: number; quantity: number }[];
	}>({ bids: [], asks: [] });
	const [aggregationValuePointer, setAggregationValuePointer] = useState(0);
	const [totalAsks, setTotalAsks] = useState(0);
	const [totalBids, setTotalBids] = useState(0);

	const handleAggregationChange = (action: "increment" | "decrement") => {
		if (action === "increment") {
			const nextValue = aggregationValuePointer + 1;
			if (nextValue < aggregationsValues.length)
				setAggregationValuePointer(nextValue);
		} else {
			const nextValue = aggregationValuePointer - 1;
			if (nextValue >= 0) setAggregationValuePointer(nextValue);
		}
	};

	useEffect(() => {
		let updatedOrderBook = getOrderBook(topOffBook, aggregationsValues[aggregationValuePointer]);
		setOrderBook(updatedOrderBook);

		setTotalBids(topOffBook.bids.reduce((acc, [_, size]) => acc + parseFloat(size), 0));
		setTotalAsks(topOffBook.asks.reduce((acc, [_, size]) => acc + parseFloat(size), 0));

		return () => {
			setOrderBook({ bids: [], asks: [] });
			setTotalAsks(0);
			setTotalBids(0);
		};
	}, [topOffBook, aggregationValuePointer]);

	return (
		<div className="bg-black text-white p-4 h-96 flex flex-col">
			<div className="flex justify-between mb-2">
				<div className="w-1/3 text-center">Market Size</div>
				<div className="w-1/3 text-center">Price ({currency})</div>
			</div>
			<div className="overflow-auto flex-1">
				{orderBook.asks.map((order, index) => (
					<div key={index} className="flex justify-between text-red-500 my-1">
						<div className="relative w-1/3 text-center">
							{order.quantity.toFixed(4)}
							<div className="absolute left-0 top-0 h-full bg-red-200 opacity-50" style={{ width: `${order.quantity/totalAsks}%` }}></div>
						</div>
						<div className="w-1/3 text-center">{order.price.toFixed(2)}</div>
					</div>
				))}
			</div>
			<div className="text-center my-2">
				<span className="text-gray-500">{currency} Spread</span>{" "}
				<span className="text-white">
					{Math.abs(bestAsk - bestBid).toFixed(2)}
				</span>
			</div>
			<div className="overflow-auto flex-1">
				{orderBook.bids.map((order, index) => (
					<div key={index} className="flex justify-between text-green-500 my-1">
						<div className="relative w-1/3 text-center">
							{order.quantity.toFixed(4)}
							<div className="absolute left-0 top-0 h-full bg-green-200 opacity-50" style={{ width: `${order.quantity/totalBids}%` }}></div>
						</div>
						<div className="w-1/3 text-center">
							{order.price.toFixed(2)}
						</div>
					</div>
				))}
			</div>
			<div className="flex justify-between mt-2 bg-black p-2">
				<div className="text-gray-500">Aggregation</div>
				<div className="text-white">
					{aggregationsValues[aggregationValuePointer]}
				</div>
				<div className="flex">
					<button
						className="bg-gray-700 text-white px-2 disabled:bg-gray-300"
						onClick={() => handleAggregationChange("decrement")}
						disabled={aggregationValuePointer === 0}
					>
						-
					</button>
					<button
						className="bg-gray-700 text-white px-2 ml-2 disabled:bg-gray-300"
						onClick={() => handleAggregationChange("increment")}
						disabled={aggregationValuePointer === aggregationsValues.length - 1}
					>
						+
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderBook;
