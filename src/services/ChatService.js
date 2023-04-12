import config from "../../config";

export default class ChatService {
    getChatRooms() {
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