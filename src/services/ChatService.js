import config from "../../config";
import AuthService from "@/services/AuthService";

export default class ChatService {
    getChatRooms() {
        if (!AuthService.isTokenValid) return { data: null, success: 401 };
        const token = localStorage.getItem(config.ACCESS_TOKEN_KEY);
            return fetch(config.API_URL + '/Chat/GetAvailableRooms', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        })
            .then(async res => {
                const data = await res.json();
                return { data: data, success: res.status === 200 };
            });
    }

    getChatHistory(roomName) {
        if (!AuthService.isTokenValid) return { data: null, success: 401 };
        const token = localStorage.getItem(config.ACCESS_TOKEN_KEY);
        return fetch(config.API_URL +'/Chat/GetRoomMessageHistory?roomName=' + roomName,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }
            })
            .then(async res => {
                const data = await res.json();
                return { data: data, success: res.status === 200 };
            });
    }
}