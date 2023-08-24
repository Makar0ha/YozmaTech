// import fetch from 'unfetch';
import { MOCK_API_CLIENTS, MOCK_API_REPORTS } from "./const/const";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllReports = () =>
    fetch(MOCK_API_REPORTS)
        .then(checkStatus);

export const login = (values) =>
    fetch(MOCK_API_CLIENTS)
        .then(checkStatus)
        .then(res => res.json())
        .then(data => data.filter(user => user.login === values.username && user.password === values.password)[0]
        );

