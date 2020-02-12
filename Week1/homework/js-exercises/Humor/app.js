const requestWithXMLHttp = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://xkcd.com/info.0.json', true);
    xhr.onload = function () {
        if (this.status == 200) {
            res = JSON.parse(this.responseText);
            // img_elem = document.createElement('img');
            // img_elem.setAttribute('src', `${response}`)
        }
    }

    xhr.onerror = function () {
        console.log('Request Error...');
    };

    xhr.send();
}

const requestWithAxios = () => {
    let config = {
        headers: {
            'Access-Control-Allow-Origin': 'https://xkcd.com/info.0.json'
        }
    }

    axios.get('https://xkcd.com/info.0.json', config)
        .then(response => {
            img_elem = document.createElement('img');
            img_elem.setAttribute('src', `${response.results[0].picture.large}`);
            document.body.appendChild(img_elem);
            console.log(response);
        })
        .catch(error => {
            console.log(`Request Error...`);
        })
}


// requestWithXMLHttp();
requestWithAxios();