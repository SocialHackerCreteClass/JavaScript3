document.getElementById('btn1').addEventListener('click', loadXML);
document.getElementById('btn2').addEventListener('click', loadaxios);


function loadXML() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dog.ceo/api/breeds/image/random', true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            const loadData = JSON.parse(xhr.responseText);
            console.log(loadData);

            const createLi = document.createElement('li');
            document.getElementById('list').appendChild(createLi);

            const createImgElement = document.createElement('img');
            const addAttribute = createImgElement.setAttribute('src', loadData.message);
            createLi.appendChild(createImgElement);
        };
    };
    xhr.send();
};

function loadaxios() {
    let axiosFetch = () => {
        axios
            .get('https://dog.ceo/api/breeds/image/random')
            .then(function (response) {
                console.log(response.data);
                const createLi = document.createElement('li');
                document.getElementById('list').appendChild(createLi);
                const createImgElement = document.createElement('img');
                const addAttribute = createImgElement.setAttribute('src', response.data.message);
                createLi.appendChild(createImgElement);
            }
            )
    };
    axiosFetch();
};

document.getElementById('list').style.listStyleType = 'none';
document.getElementById('list').style.display = 'flex';