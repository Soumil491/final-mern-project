import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function fetchData() {
    return axios({
        method: 'get',
        url: 'http://localhost:5000/getListOfPlaces'
    })
};

function* workerSaga() {
    try {
        const response = yield(call(fetchData));
        const data = response.data;
        yield put({type: 'API_CALL_SUCCESS', data});
    }
    catch(error) {
        yield put({type: 'API_CALL_FAILURE', error});
    }
}

export default function* watcherSaga() {
    yield takeLatest('API_CALL_REQUEST', workerSaga);
}
