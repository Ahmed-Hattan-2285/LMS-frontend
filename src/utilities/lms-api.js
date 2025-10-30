import sendRequest from "./sendRequest";
const url = "/courses/"

export async function coursesIndex() {
    return sendRequest(url)
}

export async function courseDetail(id) {
    return sendRequest(`${url}${id}/`)
}

export async function createCourse(courseData) {
    return sendRequest(url, 'POST', courseData)
}