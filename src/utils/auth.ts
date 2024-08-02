import CryptoJS from 'crypto-js';

const API_KEY = process.env.REACT_APP_API_KEY || '';
const API_SECRET = process.env.REACT_APP_API_SECRET || '';
const API_PASSPHRASE = process.env.REACT_APP_API_PASSPHRASE || '';

const generateSignature = (timestamp: number, method: string, requestPath: string, body: string) => {
	const what = `${timestamp}${method}${requestPath}${body}`;
	const key = CryptoJS.enc.Base64.parse(API_SECRET);
	const hmac = CryptoJS.HmacSHA256(what, key);
	return CryptoJS.enc.Base64.stringify(hmac);
};

const getAuthHeaders = () => {
    const timestamp = Date.now() / 1000;
    const method = 'GET';
    const requestPath = '/users/self/verify';
    const body = '';

    const signature = generateSignature(timestamp, method, requestPath, body);

    return {
		'CB-ACCESS-KEY': API_KEY,
		'CB-ACCESS-SIGN': signature,
		'CB-ACCESS-TIMESTAMP': timestamp,
		'CB-ACCESS-PASSPHRASE': API_PASSPHRASE,
    };
};

export { getAuthHeaders };