import sendRequest from "./sendRequest";
const url = "/courses/"

export async function coursesIndex() {
    return sendRequest(url)
}

export async function courseDetail(id) {
    return sendRequest(`${url}${id}/`)
}

export async function createCourse(formData) {
    return sendRequest(url, 'POST', formData)
}

export async function updateCourse(formData, id) {
    return sendRequest(`${url}${id}/`, 'PUT', formData)
}

export async function deleteCourse(id) {
    return sendRequest(`${url}${id}/`, 'DELETE')
}