import sendRequest from "./sendRequest";
const url = "/courses/"
const lessonsUrl = "/lessons/"

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

export async function createLesson(data) {
    return sendRequest(lessonsUrl, 'POST', data)
}

export async function lessonsIndex() {
    return sendRequest(lessonsUrl)
}

export async function addCover(id, data) {
    return sendRequest(`${url}${id}/cover/`, 'POST', data)
}