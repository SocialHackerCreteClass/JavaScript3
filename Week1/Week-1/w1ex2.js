// Using XML
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://xkcd.now.sh/?comic=latest', true);

xhr.onload = function () {
    if (xhr.status == 200) {
        const displayData = JSON.parse(xhr.responseText);
        console.log(displayData);
        const image = document.createElement('img');
        image.setAttribute('src', displayData.img);
        document.body.appendChild(image);
    };
};
xhr.send();



// Using axios

const axiosFetch = () => {
    axios
        .get('https://xkcd.now.sh/?comic=303')
        .then((response) => {
            console.log(response.data);
            const image = document.createElement('img');
            image.setAttribute('src', response.data.img);
            document.body.appendChild(image);
        }
        );

}
axiosFetch();
