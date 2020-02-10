// // with XMLHttpRequest

let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://www.randomuser.me/api', true);

xhr.onload = function () {
    if (xhr.status == 200) {
        let user = JSON.parse(xhr.responseText);
        console.log(user);

    }
}

xhr.send();

// with AXIOS

const axiosFetch = () => {
    axios
        .get('https://www.randomuser.me/api')
        .then((response) =>
            console.log(response.data)
        )
        .catch((error) =>
            console.log(error)
        )
}

axiosFetch();


