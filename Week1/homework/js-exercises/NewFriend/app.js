'use strict'

const requestWithXMLHttp = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.randomuser.me/api', true);
    xhr.onload = function () {
        if (this.status == 200) {
            let response = JSON.parse(this.responseText);
            let img_elem = document.createElement('img');
            let person = response.results[0];
            img_elem.setAttribute('src', person.picture.large);
            document.body.appendChild(img_elem);
            console.log(response);
        }
    }

    xhr.onerror = function () {
        console.log('Request Error...');
    };

    xhr.send();
}

const requestWithAxios = () => {
    axios.get('https://www.randomuser.me/api')
        .then(response => {
            let img_elem = document.createElement('img');
            let person = response.data.results[0];
            img_elem.setAttribute('src', person.picture.large);
            document.body.appendChild(img_elem);
            console.log(response);
        })
        .catch(error => {
            console.log(`Request Error...`);
        })
}


requestWithXMLHttp();
// requestWithAxios();