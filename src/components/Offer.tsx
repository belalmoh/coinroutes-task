import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const BidTitle = ({children}: any) => (
	<div className="bg-blue-500 text-white px-4 py-2">
		<h2 className="text-lg font-bold">{children}</h2>
	</div>
);

const AskTitle = ({children}: any) => (
	<div className="bg-orange-400 text-white px-4 py-2">
		<h2 className="text-lg font-bold">{children}</h2>
	</div>
);


const Offer: React.FC<{stockName: string, stockPrice: number, stockQuantity: number, offerType: 'bid' | 'ask'}> = ({stockName, stockPrice, stockQuantity, offerType}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">


		{offerType === 'bid' ? <BidTitle>Best Bid: {stockName}</BidTitle> : <AskTitle>Best Ask: {stockName}</AskTitle>}

		<div className="flex">
			<div className="w-1/2 p-4 border-r">
				<p className="text-xl font-bold">{stockPrice}</p>
				<p className="text-gray-600 text-sm">{offerType === 'ask'? 'Ask' : 'Bid'} Price</p>
			</div>
			<div className="w-1/2 p-4">
				<p className="text-xl font-bold">{stockQuantity}</p>
				<p className="text-gray-600 text-sm">{offerType === 'ask'? 'Ask' : 'Bid'} Quantity</p>
			</div>
		</div>
    </div>
  );
};

export default Offer;
