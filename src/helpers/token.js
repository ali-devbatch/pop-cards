class TokenService {
    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("popcard_user"));
        return user?.access;
    }

    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("popcard_user"));
        return user?.refresh;
    }

    updateLocalTokens(access, refresh) {
        if (localStorage.getItem("popcard_user")) {
            let user = JSON.parse(localStorage.getItem("popcard_user"));
            user.access = access;
            user.refresh = refresh;
            localStorage.setItem("popcard_user", JSON.stringify(user));
        } else {
            localStorage.setItem("popcard_user", JSON.stringify({ access: access, refresh: refresh }));
        }
    }

    setLocalUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeLocalTokens() {
        localStorage.removeItem("popcard_user");
        localStorage.removeItem("user")
    }
}

export default new TokenService();