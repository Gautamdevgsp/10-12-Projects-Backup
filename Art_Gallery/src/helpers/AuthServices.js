class AuthServices {

    setData(data, uid) {
        sessionStorage.setItem("uid", uid);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("userType", data.userType);
        sessionStorage.setItem("isLogin", true);
    }

    getUid() {
        return sessionStorage.getItem("uid");
    }

    getEmail() {
        return sessionStorage.getItem("email");
    }

    getName() {
        return sessionStorage.getItem("name");
    }

    getUserType() {
        return sessionStorage.getItem("userType");
    }

    getIsLogin() {
        return sessionStorage.getItem("isLogin");
    }

    getUser() {
        if (this.getIsLogin()) {
            return {
                uid: this.getUid(),
                email: this.getEmail(),
                name: this.getName(),
                userType: this.getUserType(),
            };
        }
        return null;
    }

    clear() {
        sessionStorage.clear();
    }
}

export default new AuthServices();
