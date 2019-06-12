import axios from 'axios';
import { API_URL } from '../constants/environments';
import {
    SHIPMENTS_LOAD_START,
    SHIPMENTS_LOAD_SUCCESS,
    SHIPMENTS_LOAD_FAIL,
    SHIPMENTS_ADD_START,
    SHIPMENTS_ADD_SUCCESS,
    SHIPMENTS_ADD_FAIL,
    SHIPMENTS_EDIT_START,
    SHIPMENTS_EDIT_SUCCESS,
    SHIPMENTS_EDIT_FAIL,
    SHIPMENTS_REMOVE_START,
    SHIPMENTS_REMOVE_SUCCESS,
    SHIPMENTS_REMOVE_FAIL,
    SHIPMENTS_DATA_CHANGED_NOTIFICATION_SHOWN
} from '../constants/shipmentActioTypes';

export function fetchShipments() {
    return dispatch => {
        dispatch({
            type: SHIPMENTS_LOAD_START
        });

        axios
            .get(API_URL + 'shipments')
            .then(response => {
                console.log("Response")
                console.log(response.data)
                dispatch({
                    type: SHIPMENTS_LOAD_SUCCESS,
                    payload: { shipments: response.data }
                })
            })
            .catch(error => {
                dispatch({
                    type: SHIPMENTS_LOAD_FAIL,
                    payload: { error: error.response }
                })
            });
    }
}

export function addShipment(data) {
    return dispatch => {
        dispatch({
            type: SHIPMENTS_ADD_START
        });

        axios
            .post(API_URL + 'shipments', data)
            .then(response => {
                dispatch({
                    type: SHIPMENTS_ADD_SUCCESS,
                    payload: { shipment: response.data }
                })
            })
            .catch(error => {
                dispatch({
                    type: SHIPMENTS_ADD_FAIL,
                    payload: { error: error.response }
                })
            });
    }
}

export function editShipment(data) {
    return dispatch => {
        dispatch({
            type: SHIPMENTS_EDIT_START
        });

        axios
            .put(API_URL + 'shipments', data)
            .then(response => {
                dispatch({
                    type: SHIPMENTS_EDIT_SUCCESS,
                    payload: { shipment: response.data }
                })
            })
            .catch(error => {
                dispatch({
                    type: SHIPMENTS_EDIT_FAIL,
                    payload: { error: error.response }
                })
            });
    }
}

export function removeShipment(id) {
    return dispatch => {
        dispatch({
            type: SHIPMENTS_REMOVE_START
        });

        axios
            .delete(API_URL + 'shipments/' + id)
            .then(_ => {
                dispatch({
                    type: SHIPMENTS_REMOVE_SUCCESS,
                    payload: { id }
                })
            })
            .catch(error => {
                dispatch({
                    type: SHIPMENTS_REMOVE_FAIL,
                    payload: { error: error.response }
                })
            });
    }
}

export function shipmentsDataChangedNotificationShown() {
    return dispatch => {
        dispatch({
            type: SHIPMENTS_DATA_CHANGED_NOTIFICATION_SHOWN,
            payload: null
        })
    }
}