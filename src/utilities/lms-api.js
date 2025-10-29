import sendRequest from "./sendRequest";
const url = "/courses/"

export async function coursesIndex() {
    return sendRequest(url)
}