import { authHeader } from '../_helpers';
const config = {
    apiUrl: "http://localhost:8080/api"
}

export const userService = {
    login,
    logout,
    register,
    getAll,
    getNotes,
    getNotesByUser,
    search
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${config.apiUrl}/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // login successful if there's a user in the response
            if (data) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                data.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            return data.accessToken;
        });
}

function register(username, password, email, name) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${config.apiUrl}/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`, requestOptions)
        .then(handleResponse).then(data => {
            return data;
        });
}

function logout() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    return fetch(`${config.apiUrl}/logout`, requestOptions).then(handleResponse).then(data => {
    })
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/all`, requestOptions).then(handleResponse);
}

function getNotes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/notes`, requestOptions).then(handleResponse);
}

function getNotesByUser(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/notes/user/${userId}`, requestOptions).then(handleResponse);
}

function search(keyword) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/notes/search?keyword=${encodeURIComponent(keyword)}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = response.status;
            return Promise.reject(error);
        }

        return data;
    });
}