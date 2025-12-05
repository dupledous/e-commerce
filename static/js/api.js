const API_URL = "http://127.0.0.1:8000/api/";
const token = localStorage.getItem("token");

function authHeaders() {
    return token
        ? { "Authorization": `Token ${token}`, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" };
}
