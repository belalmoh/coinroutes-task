import CryptoJS from 'crypto-js';

const API_KEY = '687fd22a764219a2f9495ea7384bed92';
const API_SECRET = '9U04t/gqa8MKjQj0cG7BK1T7zN8wAizmoN6lzliscddU1x6SWRMJ4jVJ9bAZIBuJ5oUSlustDx2ypCSeo7Pfvw==';
const API_PASSPHRASE = 'ai1d393qtc5';

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