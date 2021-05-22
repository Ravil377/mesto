export class UserInfo {
    constructor(userNameSelector, userAboutSelector, avatarSelector) {
        this._name = document.querySelector(userNameSelector);
        this._about = document.querySelector(userAboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src,
        };
    }

    setUserInfo({name, about}) {
        this._name.textContent = name;
        this._about.textContent = about;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
}
