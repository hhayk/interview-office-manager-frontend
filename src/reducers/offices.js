import {
    OFFICES_LOAD_START,
    OFFICES_LOAD_SUCCESS,
    OFFICES_LOAD_FAIL,
    OFFICES_ADD_SUCCESS,
    OFFICES_EDIT_SUCCESS,
    OFFICES_REMOVE_SUCCESS,
    OFFICES_DATA_CHANGED_NOTIFICATION_SHOWN
} from '../constants/officeActionTypes';

const defaultState = {
    offices: [],
    officeDataChanged: false,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case OFFICES_LOAD_START:
            return {
                ...state,
                offices: []
            }
        case OFFICES_LOAD_SUCCESS:
            return {
                ...state,
                offices: action.payload.offices
            }
        case OFFICES_LOAD_FAIL:
            return {
                ...state,
                offices: []
            }
        case OFFICES_ADD_SUCCESS:
            return {
                ...state,
                offices: [...state.offices, action.payload.office],
                officeDataChanged: true
            }
        case OFFICES_EDIT_SUCCESS:
            let idx = state.offices.findIndex(o => o.id === action.payload.office.id);
            let newOffices = [...state.offices]
            newOffices[idx] = action.payload.office;
            return {
                ...state,
                offices: newOffices,
                officeDataChanged: true
            }
        case OFFICES_REMOVE_SUCCESS:
            return {
                ...state,
                offices: state.offices.filter(o => o.id !== action.payload.id)
            }
        case OFFICES_DATA_CHANGED_NOTIFICATION_SHOWN:
            return {
                ...state,
                officeDataChanged: false
            }
        default:
            return state;
    }
}