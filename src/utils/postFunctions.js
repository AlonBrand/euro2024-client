

export const postSignUp = async ({ name, password, updateConnectedUserName, setIsConnect, closeModal, setPostInProgress }) => {
    setPostInProgress(() => true);
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, password: password }),
    };
    try {
        // let response = await fetch("https://wc2022-server-k330-main-y62tkictza-wm.a.run.app/sign-up", requestOptions);
        let response = await fetch("http://127.0.0.1:5000/sign-up", requestOptions);
        response.json()
            .then((data) => {
                console.log(data)
                setPostInProgress(() => false);
                if (data?.msg === 'UNIQUE constraint failed: Users.name') {
                    const element = document.getElementById("login-placeHolder");
                    element.innerHTML = '<h5> User name already exist! </h5>';
                }
                else if (data?.msg === 'User Connected') {
                    const cookie_object = {
                        user_name: data?.user_name,
                        user_id: data?.user_id
                    }
                    document.cookie = `name=${JSON.stringify(cookie_object)}; expires=${new Date(2023, 11, 11).toUTCString()}`
                    window.USER_ID = data?.user_id;
                    updateConnectedUserName(`Hi, ${data?.user_name}`)
                    setIsConnect(() => true);
                    closeModal();
                }
            });
    } catch (e) {
        setPostInProgress(() => false)
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
        // let response = await fetch("https://wc2022-server-k330-main-y62tkictza-wm.a.run.app/log-in", requestOptions);
        let response = await fetch("http://127.0.0.1:5000/log-in", requestOptions);
        response.json()
            .then((data) => {
                setPostInProgress(() => false);
                console.log(data)
                console.log(data?.msg)
                if (data?.msg === 'User connected') {
                    const cookie_object = {
                        user_name: data?.user_name,
                        user_id: data?.user_id
                    }
                    document.cookie = `name=${JSON.stringify(cookie_object)}; expires=${new Date(2023, 11, 11).toUTCString()}`
                    console.log(document.cookie)
                    window.USER_ID = data?.user_id;
                    updateConnectedUserName(`Hi, ${data?.user_name}`);
                    setIsConnect(() => true);
                    closeModal()
                }
                else if (data?.msg === "Wrong user name or password!") {
                    const element = document.getElementById("login-placeHolder");
                    element.innerHTML = '<h5>Wrong user name or password!</h5>';
                }
            });
    } catch (e) {
        setIsConnect(() => false)
        console.log("Post log in error =>", e);
    }
};

export const postSideBet = async ({ winnigTeam, topScorer }) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winnigTeam: winnigTeam, topScorer: topScorer, user: window.USER_ID }),
    };
    try {
        const response = await fetch("http://127.0.0.1:5000/side_bet", requestOptions);
        console.log(response);
    } catch (e) {
        console.log(e);
    }
}
