import http from "../http-common"

const create = data => {
    return http.post("/thought", data)
}
const getAll = () => {
    return http.get("/thought")
}
const ThoughtService = {
    create,
    getAll
}
export default ThoughtService