//made using xmlhttp request

let xmlObject = new XMLHttpRequest();

function randomDogPhotoXml() {
  xmlObject.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Typical action to be performed when the document is ready:
      let jsonObject = JSON.parse(xmlObject.responseText);
      let button = document.querySelector('button');

      let image = document.createElement('img');
      image.setAttribute('width', '150px');
      image.setAttribute('height', '150px');
      image.src = jsonObject.message;

      document.body.appendChild(image);

      console.log(image);
    }
  };

  xmlObject.open('GET', 'https://dog.ceo/api/breeds/image/random');
  xmlObject.onerror = err => {
    console.log(err);
  };
  xmlObject.send();
}

let buttonOne = document.getElementById('buttonOne');
buttonOne.addEventListener('click', () => {
  randomDogPhotoXml();
});

//made using axios

function randomDogPhotoAxios() {
  axios
    .get('https://dog.ceo/api/breeds/image/random')
    .then(function(response) {
      // handle success
      let imageAxios = document.createElement('img');
      imageAxios.src = response.data.message;
      imageAxios.setAttribute('width', '300px');
      imageAxios.setAttribute('height', '300px');
      console.log(imageAxios);
      document.body.appendChild(imageAxios);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}

let buttonTwo = document.getElementById('buttonTwo');
buttonTwo.addEventListener('click', () => {
  randomDogPhotoAxios();
});
