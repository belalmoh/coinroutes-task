# CoinRoutes Real-Time Chart

![CoinRoutes Real-Time Chart](./path/to/screenshot.png)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Overview
CoinRoutes Real-Time Chart is a React-based application designed to display real-time market data for BTC-USD from CoinRoutes. The application connects to the Coinbase WebSocket API to receive live updates of market bids and asks, and visualizes the data using interactive charts and tables.

## Features
- Real-time updates of BTC-USD market data
- Interactive line charts for visualizing bids and asks
- Responsive design for seamless experience across devices
- Authentication with Coinbase API using API keys
- Dynamic progress bars to visualize market sizes
- Detailed market order book

## Technologies Used
- React
- TypeScript
- Chart.js and react-chartjs-2 for data visualization
- react-use-websocket for WebSocket connections
- CryptoJS for API authentication
- CSS for styling

## Installation
1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/coinroutes-realtime-chart.git
    cd coinroutes-realtime-chart
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables**
    Create a `.env` file in the root directory and add your Coinbase API credentials:
    ```env
    REACT_APP_API_KEY=your_api_key
    REACT_APP_API_SECRET=your_api_secret
    REACT_APP_API_PASSPHRASE=your_api_passphrase
    ```

## Usage
1. **Start the application**
    ```bash
    npm start
    ```

2. **Open your browser and navigate to**
    ```
    http://localhost:3000
    ```

## Configuration
You can customize the following configurations:
- **WebSocket URL:** Change the WebSocket URL in the source code if needed.
- **Product ID:** Change the product ID to monitor a different market pair.

## Contributing
Contributions are welcome! Please follow these steps:
1. **Fork the repository**
2. **Create a new branch**
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes**
4. **Commit your changes**
    ```bash
    git commit -m "Add your commit message"
    ```
5. **Push to the branch**
    ```bash
    git push origin feature/your-feature-name
    ```
6. **Open a pull request**

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
