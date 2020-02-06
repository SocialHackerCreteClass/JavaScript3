//function using XMLHttp Request

let xhrObject = new XMLHttpRequest();
//console.log(xhrObject);
//
xhrObject.addEventListener("error", xhrObjectErrorHandler);

function xhrObjectErrorHandler(event) {
  console.log("Error");
}
xhrObject.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready: <=== ιI leave as it is for better explanation

    let xhrObjectJason = JSON.parse(xhrObject.responseText);
    //console.log(xhrObjectJason);

    let name = `${xhrObjectJason.results[0].name.first} ${xhrObjectJason.results[0].name.last}`;
    document.body.innerHTML = `<h1> Hello ${name}, you were called using XmlHttpRequest.</h1>`;
  }
};

xhrObject.open("GET", "https://www.randomuser.me/api");
xhrObject.send();

//function using axios

axios
  .get("https://www.randomuser.me/api")
  .then(function(response) {
    let nameAxios = `${response.data.results[0].name.first}  ${response.data.results[0].name.last}`;
    document.body.innerHTML += `<h1> Hello ${nameAxios}, you were called using Axios.</h1>`;
  })
  .catch(function(error) {
    //console.log(error);
  });
