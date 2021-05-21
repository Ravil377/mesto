export class UserInfo {
    constructor(userName, userAbout, avatarSelector) {
        this._name = userName;
        this._about = userAbout;
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src,
        };
    }

    setUserInfo(name, about) {
        this._name.textContent = name;
        this._about.textContent = about;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
}
