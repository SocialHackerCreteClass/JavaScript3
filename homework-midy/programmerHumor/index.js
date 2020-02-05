const url = 'https://xkcd.now.sh/?comic=';
const randomComicNumber = Math.floor(Math.random() * (2000 - 1) + 1);
// Used a different url here becuase the one provided
// wasn't working for some reason

// ------------------------XMLHttpRequest---------------------
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    const image = document.createElement('img');
    image.setAttribute('src', JSON.parse(xhr.response).img);
    document.body.appendChild(image);
    console.log(JSON.parse(xhr.response, null, '\t'));
  }
};
xhr.open('GET', url + randomComicNumber);
xhr.send();

// -------------------------Using Axios---------------------

axios
  .get(url + randomComicNumber)
  .then(res => {
    const image = document.createElement('img');
    image.setAttribute('src', res.data.img);
    document.body.appendChild(image);
  })
  .catch(err => {
    console.error(err);
  });
