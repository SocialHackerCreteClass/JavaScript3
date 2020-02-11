const url = 'https://xkcd.now.sh/?comic=latest';
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        let image = document.createElement('img');
        image.setAttribute('src', myObj.img)
        document.body.appendChild(image);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

const axiosFetchData = () => {
    axios.get(url)
        .then((response) => {
            let image = document.createElement('img');
            image.setAttribute('src', response.data.img);
            document.body.appendChild(image);
        })
}
axiosFetchData();