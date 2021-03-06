import { API } from '../../config/api';

import {
	GET_MUSIC_ALL,
	GET_MUSIC_FAIL,
	ADD_ARTIST_SUCCESS,
	ADD_ARTIST_FAIL,
	ADD_MUSIC_SUCCESS,
	ADD_MUSIC_FAIL,
	GET_ARTIS_ALL,
	GET_ARTIS_FAIL
} from './types';

//Get All Films
export const getMusicAll = (limit) => async (dispatch) => {
	try {
		let res = await API.get(`music?page=1&limit=${limit}`);
		dispatch({
			type: GET_MUSIC_ALL,
			payload: res.data.data
		});
	} catch (err) {
		dispatch({
			type: GET_MUSIC_FAIL,
			payload: err.response.data.error.message
		});
	}
};

//Add Music
export const add_Music = (payload, redirect) => async (dispatch) => {
	try {
		const { title, year, thumbnail, singerId, attache } = payload;

		const formData = new FormData();

		formData.append('title', title);
		formData.append(
			'attache',
			'https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3'
		);
		formData.append('thumbnail', thumbnail);
		formData.append('year', year);
		formData.append('singerId', singerId);

		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};

		let res = await API.post(`/music`, formData, config);
		dispatch({
			type: ADD_MUSIC_SUCCESS,
			payload: res.data.data
		});
		redirect();
	} catch (err) {
		dispatch({
			type: ADD_MUSIC_FAIL,
			payload: err.res.data.error.message
		});
	}
};

//Add Artist
export const add_Artist = (formData, cleanForm) => async (dispatch) => {
	try {
		const { name, old, type, startCareer } = formData;

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = JSON.stringify({
			name,
			old,
			type,
			startCareer
		});

		let res = await API.post(`/artist`, body, config);
		dispatch({
			type: ADD_ARTIST_SUCCESS,
			payload: res.data.data
		});
		cleanForm();
	} catch (err) {
		dispatch({
			type: ADD_ARTIST_FAIL,
			payload: err.res.data.error.message
		});
	}
};

//Get All Artist
export const getArtistAll = (limit) => async (dispatch) => {
	try {
		let res = await API.get(`/artist`);
		dispatch({
			type: GET_ARTIS_ALL,
			payload: res.data.data
		});
	} catch (err) {
		dispatch({
			type: GET_ARTIS_FAIL,
			payload: err.response.data.error.message
		});
	}
};
