export function login(username, password) {
    return fetch("https://api.ituring.com.cn/api/Account/Token", {
        "credentials": "omit",
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json",
            "sec-fetch-mode": "cors",
            "x-referrer-url": "https://m.ituring.com.cn/login"
        },
        "body": JSON.stringify({ "email": username, "password": password }),
        "method": "POST",
        "mode": "cors"
    }).then(response => response.json());
}

export function getProfile(token) {
    return fetch("https://api.ituring.com.cn/api/User/Profile", {
        "credentials": "include",
        "headers": {
            "accept": "application/json, text/plain, */*",
            "authorization": "bearer " + token,
            "sec-fetch-mode": "cors",
            "x-cors-origin": location.origin
        },
        "body": null,
        "method": "GET",
        "mode": "cors"
    }).then(response => response.json());
}

export function selfEbooks(token) {
    return fetch("https://api.ituring.com.cn/api/User/ShelfEBook?page=1&query=&desc=true",
        {
            "credentials": "include",
            "headers": {
                "accept": "application/json, text/plain, */*",
                "authorization": "bearer " + token,
                "sec-fetch-mode": "cors"
            },
            "body": null,
            "method": "GET",
            "mode": "cors"
        }).then(response => response.json());
}