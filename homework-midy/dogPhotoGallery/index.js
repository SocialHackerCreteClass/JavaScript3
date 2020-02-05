const url = 'https://dog.ceo/api/breeds/image/random';
// ------------------------XMLHttpRequest---------------------
function xmlRequest() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const imageListItem = document.createElement('li');
      const image = document.createElement('img');
      image.setAttribute('src', JSON.parse(xhr.response).message);
      imageListItem.appendChild(image);
      document.getElementById('dog-list').appendChild(imageListItem);
    }
  };
  xhr.open('GET', url);
  xhr.send();
}

document.getElementById('xml').addEventListener('click', () => {
  xmlRequest();
});
// -------------------------Using Axios---------------------

function axiosRequest() {
  axios
    .get(url)
    .then(res => {
      const imageListItem = document.createElement('li');
      const image = document.createElement('img');
      image.setAttribute('src', res.data.message);
      imageListItem.appendChild(image);
      document.getElementById('dog-list').appendChild(imageListItem);
    })
    .catch(err => {
      console.error(err);
    });
}

document.getElementById('axios').addEventListener('click', () => {
  axiosRequest();
});
