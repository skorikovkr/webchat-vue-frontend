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
                var base64Url = data.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const username = JSON.parse(jsonPayload)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                localStorage.setItem(config.ACCESS_TOKEN_KEY, data);
                localStorage.setItem("username", username);
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
            localStorage.removeItem("username");
            return { data: data, success: res.status === 200 };
        });
    }
}