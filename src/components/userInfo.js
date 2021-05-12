export class UserInfo {
    constructor(userName, userAbout) {
        this._name = userName;
        this._about = userAbout;
    }

    getUserInfo() {
        return {
            name: this._name,
            about: this._about,
        };
    }

    setUserInfo(formValues) {
        this._name.textContent = formValues.fio;
        this._about.textContent = formValues.info;
    }
}
