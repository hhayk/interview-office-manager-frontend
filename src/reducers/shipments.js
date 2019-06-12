import {
    SHIPMENTS_LOAD_START,
    SHIPMENTS_LOAD_SUCCESS,
    SHIPMENTS_LOAD_FAIL,
    SHIPMENTS_ADD_SUCCESS,
    SHIPMENTS_EDIT_SUCCESS,
    SHIPMENTS_REMOVE_SUCCESS,
    SHIPMENTS_DATA_CHANGED_NOTIFICATION_SHOWN
} from '../constants/shipmentActioTypes';

const defaultState = {
    shipments: [],
    shipmentsDataChanged: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case SHIPMENTS_LOAD_START:
            return {
                ...state,
                shipments: []
            }
        case SHIPMENTS_LOAD_SUCCESS:
            return {
                ...state,
                shipments: action.payload.shipments
            }
        case SHIPMENTS_LOAD_FAIL:
            return {
                ...state,
                shipments: []
            }
        case SHIPMENTS_ADD_SUCCESS:
            console.log("SHIPMENTS_ADD_SUCCESS")
            console.log(action.payload)
            return {
                ...state,
                shipments: [...state.shipments, action.payload.shipment],
                shipmentsDataChanged: true
            }
        case SHIPMENTS_EDIT_SUCCESS:
            let idx = state.shipments.findIndex(o => o.id === action.payload.shipment.id);
            let newShipments = [...state.shipments]
            newShipments[idx] = action.payload.shipment;
            return {
                ...state,
                shipments: newShipments,
                shipmentsDataChanged: true
            }
        case SHIPMENTS_REMOVE_SUCCESS:
            return {
                ...state,
                shipments: state.shipments.filter(o => o.id !== action.payload.id)
            }
        case SHIPMENTS_DATA_CHANGED_NOTIFICATION_SHOWN:
            return {
                ...state,
                shipmentsDataChanged: false
            }
        default:
            return state;
    }
}