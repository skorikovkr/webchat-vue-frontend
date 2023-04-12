import config from "../../config";

export default class AuthService {
    signIn(username, password) {
        return fetch(config.API_URL + "/Identity/SignIn", {
        method: "POST",
        headers: { "Accept": "application/json, text/plain, */*", "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: password
        })})
            .then(async res => {
                const data = await res.text();
                localStorage.setItem(config.ACCESS_TOKEN_KEY, data);
                return { data: data, success: res.status === 200 };
            });
    }

    signOut() {
        const token = localStorage.getItem(config.ACCESS_TOKEN_KEY);
        return fetch(config.API_URL + "/Identity/Logout", {
        method: "POST",
        credentials: 'include',
        headers: { "Accept": "application/json, text/plain, */*", "Content-Type": "application/json", "Authorization": "Bearer " + token }
        })
        .then(async res => {
            const data = await res.text();
            localStorage.removeItem(config.ACCESS_TOKEN_KEY);
            return { data: data, success: res.status === 200 };
        });
    }
}