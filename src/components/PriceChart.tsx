
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { useRef } from 'react';
import { TopOffBook } from '../types/CoinBaseTypes';

const PriceChart: React.FC<{productId: string, topOffBook: TopOffBook}> = ({productId, topOffBook}) => {

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    const options: Highcharts.Options = {
		title: {
		  text: `Bids VS Asks for ${productId}`
		},
		yAxis: [
			{
                title: {
                    text: 'Bids',
                },
                opposite: false, // Primary Y axis on the left
			},
			{
                title: {
                    text: 'Asks',
                },
                opposite: true, // Secondary Y axis on the right
                linkedTo: 0, // Ensures that the secondary axis is linked to the primary axis for scaling
			},
        ],
		series: [
			{
				data: topOffBook.bids.map(bid => [(bid[2]).getTime(), parseFloat(bid[0])]),
				name: 'Bids', type: 'line', color: 'blue', step: 'left'
			},
			{
				data: topOffBook.asks.map(ask => [(ask[2]).getTime(), parseFloat(ask[0])]),
				name: 'Asks', type: 'line', color: 'orange', step: 'right'
			}
		]
	};

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            allowChartUpdate = { true }
            immutable = { false }
            options={options}
            ref={chartComponentRef}
        />
    )
}

export default PriceChart;