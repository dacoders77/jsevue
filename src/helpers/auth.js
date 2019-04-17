/* eslint-disable */
export function login (credentials) {
    return new Promise((res, rej) => {
        //axios.post('api/auth/login', credentials) // jwt
        //axios.post('http://gedosinboiler/oauth/token', credentials) // oauth. Works good

        // Do not send auth request if login/password is empty
        if(credentials.username != "" && credentials.username != "") {
            axios.post('auth/login', credentials)
                .then((response) => {
                    res(response.data);
                })
                .catch((err) => {
                    rej("Wrong email or password");
                })
        }
    })
}

export function getLocalUser () {
    const userStr = localStorage.getItem('user')

    if (!userStr) {
        return "null_user"; // If there is no user - return null
    }

    return JSON.parse(userStr);
}