const apiUrl = process.env.REACT_APP_API_URL;

export const postSignUp = async ({ name, password, updateConnectedUserName, setIsConnect, closeModal, setPostInProgress }) => {
    setPostInProgress(true);
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, password: password }),
    };
    try {
        let response = await fetch(`${apiUrl}/sign-up`, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        response.json()
            .then((data) => {
                console.log(data)
                setPostInProgress(false);
                if (data?.success) {
                    const cookie_object = {
                        user_name: data?.user_name,
                        user_id: data?.user_id
                    }
                    document.cookie = `name=${JSON.stringify(cookie_object)}; expires=${new Date(2024, 11, 30).toUTCString()}`
                    window.USER_ID = data?.user_id;
                    updateConnectedUserName(`Hi, ${data?.user_name}`)
                    setIsConnect(() => true);
                    closeModal();
                }
                if (data?.msg) {
                    const element = document.getElementById("login-placeHolder");
                    element.innerHTML = data?.msg;
                }
            });
    } catch (e) {
        setPostInProgress(false)
        console.log("Post sign up error =>", e);
    }
};

export const postLogIn = async ({ name, password, updateConnectedUserName, setIsConnect, closeModal, setPostInProgress }) => {
    setPostInProgress(() => true);
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, password: password }),
    };
    try {
        let response = await fetch(`${apiUrl}/log-in`, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        response.json()
            .then((data) => {
                setPostInProgress(false);
                if (data?.connect) {
                    const cookie_object = {
                        user_name: data?.user_name,
                        user_id: data?.user_id
                    }
                    document.cookie = `name=${JSON.stringify(cookie_object)}; expires=${new Date(2024, 11, 11).toUTCString()}`
                    window.USER_ID = data?.user_id;
                    updateConnectedUserName(`Hi, ${data?.user_name}`);
                    setIsConnect(true);
                    closeModal()
                }
                else if (data?.msg) {
                    const element = document.getElementById("login-placeHolder");
                    element.innerHTML = `<h5>${data?.msg}</h5>`;
                }
            });
    } catch (e) {
        setIsConnect(false)
        console.log("Post log in error =>", e);
    }
};

export const postSideBet = async ({ winnigTeam, topScorer }) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winningTeam: winnigTeam, topScorer: topScorer, userId: window.USER_ID }),
    };
    try {
        const response = await fetch(`${apiUrl}/side-bets`, requestOptions);
        console.log(response);
    } catch (e) {
        console.log(e);
    }
}
