let header = document.createElement('H1');
header.innerHTML = `In this webpage you will see the latest post from xkcd.com <br>
First one is displayed with an XMLHttpRequest and second one is displayed with axios library `;
document.body.appendChild(header);
//document.body.appendChild

//function using XMLHttpRequest--------

let xhrObject = new XMLHttpRequest();

xhrObject.onreadystatechange = () => {
  if (xhrObject.readyState == 4 && xhrObject.status == 200) {
    let xhrObjectJason = JSON.parse(xhrObject.responseText);
    let image = document.createElement('img');
    image.src = xhrObjectJason.img;
    document.body.appendChild(image);
  }
};

xhrObject.open('GET', 'https://xkcd.now.sh/?comic=latest');
xhrObject.onerror = err => {
  console.log(err);
};
xhrObject.send();

//function using axios--------

axios
  .get('https://xkcd.now.sh/?comic=latest')
  .then(function(response) {
    // handle success
    let axiosImage = document.createElement('img');
    axiosImage.src = response.data.img;
    document.body.appendChild(axiosImage);

    console.log(axiosImage);
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  });
