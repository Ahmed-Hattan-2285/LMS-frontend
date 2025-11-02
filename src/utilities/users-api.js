import sendRequest from "./sendRequest";
const url = "/users"

export async function signup(formData) {
    try {
        console.log(formData, "checking formdata");
        const response = await sendRequest(`${url}/register/`, "POST", formData);
        console.log(response);
        localStorage.setItem('token', response.access);
        return response.user;
    } catch (err) {
        localStorage.removeItem('token');
        return null;
    }
}

export async function login(formData) {
    try {
        const response = await sendRequest(`${url}/login/`, "POST", formData);
        localStorage.setItem('token', response.access);
        localStorage.setItem('refresh', response.refresh);
        console.log(response, "login check response");
        return response.user;
    } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        return null;
    }
}

export async function getUser() {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await sendRequest(`${url}/verify/`, 'GET');
            localStorage.setItem('token', response.access);
            localStorage.setItem('refresh', response.refresh);
            return response.user;
        }
        return null;
    } catch (err) {
        console.log(err);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        return null;
    }
}

export async function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
}

export async function register(formData) {
    return signup(formData);
}