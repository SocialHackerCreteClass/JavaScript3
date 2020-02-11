const url = 'https://randomuser.me/api';
document.getElementById('requestXml').addEventListener('click', () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(xmlhttp.response);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
});


document.getElementById('axiosRequest').addEventListener('click', () => {
    const axiosFetchData = () => {
        axios.get(url)
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    axiosFetchData();
});