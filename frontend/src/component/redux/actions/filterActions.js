import axios from 'axios';
import { GET_PRODUCTS, STOP_LOADING , SHOW_ERROR_MESSAGE } from '../constants/filterConstants';

export const getProductsByFilter = arg => async dispatch => {
	try {
		const response = await axios.post('http://localhost:9000/api/blog/search', arg);

		dispatch({
			type: GET_PRODUCTS,
			payload: response.data.products,
		});
	} catch (err) {
		console.log('getProductsByFilter api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};