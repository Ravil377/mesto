export class Api {
    constructor(options) {
        this._options = options;
    }

    getProfileInfo() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: {
                authorization: `${this._options.authorization}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    postProfileInfo(name, about) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    postProfileAvatar(avatar) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: avatar,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    postCard(nameCard, linkCard) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: "POST",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameCard,
                link: linkCard,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    likeAdd(id) {
        return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
            method: "PUT",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                owner: {
                    _id: "997905c6446d826c7cb080d1",
                },
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteLike(id) {
        return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                owner: {
                    _id: "997905c6446d826c7cb080d1",
                },
            }),
        }).then((result) => {
            if (result.ok) {
                return result.json();
            }
            return Promise.reject(`Ошибка: ${result.status}`);
        });
    }

    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            headers: {
                authorization: `${this._options.authorization}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                owner: {
                    _id: "997905c6446d826c7cb080d1",
                },
            }),
        })
            .then((result) => {
                if (result.ok) {
                    return result.json();
                }
                return Promise.reject(`Ошибка: ${result.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
