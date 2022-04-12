import axios from 'axios';

function ajax(url, data = {}, method) {
	if (method.toUpperCase() === 'GET') {
		let dataStr = '';
		if (JSON.stringify(data) != '{}') {
			Object.keys(data).forEach((item) => {
				dataStr += `${item}=${data[item]}&`;
			});
			if (dataStr) {
				dataStr = dataStr.substring(0, dataStr.length - 1);
			}
		}

		return axios.get(url + '?' + dataStr);
	} else if (method.toUpperCase() === 'POST') {
		return axios.post(url, data);
	}
}

export default ajax;
