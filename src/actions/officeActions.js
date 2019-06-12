import axios from 'axios';
import { API_URL } from '../constants/environments';
import {
    OFFICES_LOAD_START,
    OFFICES_LOAD_SUCCESS,
    OFFICES_LOAD_FAIL,
    OFFICES_ADD_START,
    OFFICES_ADD_SUCCESS,
    OFFICES_ADD_FAIL,
    OFFICES_EDIT_START,
    OFFICES_EDIT_SUCCESS,
    OFFICES_EDIT_FAIL,
    OFFICES_REMOVE_START,
    OFFICES_REMOVE_SUCCESS,
    OFFICES_REMOVE_FAIL,
    OFFICES_DATA_CHANGED_NOTIFICATION_SHOWN
} from '../constants/officeActionTypes';

export function fetchOffices() {
    return dispatch => {
        dispatch({
            type: OFFICES_LOAD_START
        });

        axios
            .get(API_URL + 'offices')
            .then(response => {
                dispatch({
                    type: OFFICES_LOAD_SUCCESS,
                    payload: { offices: response.data }
                })
            })
            .catch(error => {
                dispatch({
                    type: OFFICES_LOAD_FAIL,
                    payload: { error: error.response }
                })
            });
    }
}

export function addOffice(data) {
    return dispatch => {
        dispatch({
            type: OFFICES_ADD_START
        });

        axios
            .post(API_URL + 'offices', data)
            .then(response => {
                dispatch({
                    type: OFFICES_ADD_SUCCESS,
                    payload: { office: response.data }
                })
            })
            .catch(error => {
                dispatch({
                    type: OFFICES_ADD_FAIL,
                    payload: { error: error.response }
                })
            });
    }
}

export function editOffice(data) {
    return dispatch => {
        dispatch({
            type: OFFICES_EDIT_START
        });

        axios
            .put(API_URL + 'offices', data)
            .then(response => {
                dispatch({
                    type: OFFICES_EDIT_SUCCESS,
                    payload: { office: response.data }
                })
            })
            .catch(error => {
                dispatch({
                    type: OFFICES_EDIT_FAIL,
                    payload: { error: error.response }
                })
            });
    }
}

export function removeOffice(id) {
    return dispatch => {
        dispatch({
            type: OFFICES_REMOVE_START
        });

        axios
            .delete(API_URL + 'offices/' + id)
            .then(_ => {
                dispatch({
                    type: OFFICES_REMOVE_SUCCESS,
                    payload: { id }
                })
            })
            .catch(error => {
                dispatch({
                    type: OFFICES_REMOVE_FAIL,
                    payload: { error: error.response }
                })
            });
    }
}

export function officeDataChangedNotificationShown() {
    return dispatch => {
        dispatch({
            type: OFFICES_DATA_CHANGED_NOTIFICATION_SHOWN,
            payload: null
        })
    }
}