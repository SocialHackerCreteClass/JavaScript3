const url = 'https://dog.ceo/api/breeds/image/random';
document.getElementById('button1').addEventListener('click', () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            let image = document.createElement('img');
            image.setAttribute('src', myObj.message);
            image.style.width = '150px';
            image.style.height = '150px';
            const imageItem = document.createElement('li');
            imageItem.appendChild(image);
            document.getElementById('list').appendChild(imageItem);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
});

document.getElementById('button2').addEventListener('click', () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            let image = document.createElement('img');
            image.style.width = '150px';
            image.style.height = '150px';
            image.setAttribute('src', myObj.message)
            const imageItem = document.createElement('li');
            imageItem.appendChild(image);
            document.getElementById('list').appendChild(imageItem);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
});


document.getElementById('button1').addEventListener('click', () => {
    const axiosFetchData = () => {
        axios.get(url)
            .then((response) => {
                let image = document.createElement('img');
                image.setAttribute('src', response.data.message);
                image.style.width = '150px';
                image.style.height = '150px';
                const imageItem = document.createElement('li');
                imageItem.appendChild(image);
                document.getElementById('list').appendChild(imageItem);
            })
    }
    axiosFetchData();
});

document.getElementById('button2').addEventListener('click', () => {
    const axiosFetchData = () => {
        axios.get(url)
            .then((response) => {
                let image = document.createElement('img');
                image.setAttribute('src', response.data.message);
                image.style.width = '150px';
                image.style.height = '150px';
                const imageItem = document.createElement('li');
                imageItem.appendChild(image);
                document.getElementById('list').appendChild(imageItem);
            })
    }
    axiosFetchData();
});