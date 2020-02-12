'use strict'

const btnXml = document.getElementById('button__xml');
const btnAxios = document.getElementById('button__axios');
const dogList = document.getElementById('dog__list');

const requestWithXMLHttp = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dog.ceo/api/breeds/image/random', true);
    xhr.onload = function () {
        if (this.status == 200) {
            let response = JSON.parse(this.responseText);
            let img_elem = document.createElement('img');
            img_elem.setAttribute('src', response.message);
            let dog_elem = document.createElement('li');
            dog_elem.appendChild(img_elem);
            dogList.appendChild(dog_elem);
            console.log(response);
        }
    }

    xhr.onerror = function () {
        console.log('Request Error...');
    };

    xhr.send();
}

const requestWithAxios = () => {
    axios.get('https://dog.ceo/api/breeds/image/random')
        .then(response => {
            let img_elem = document.createElement('img');
            img_elem.setAttribute('src', response.data.message);
            let dog_elem = document.createElement('li');
            dog_elem.appendChild(img_elem);
            dogList.appendChild(dog_elem);
            console.log(response);
        })
        .catch(error => {
            console.log(`Request Error...`);
        })
}

btnXml.addEventListener('click', requestWithXMLHttp);
btnAxios.addEventListener('click', requestWithAxios);