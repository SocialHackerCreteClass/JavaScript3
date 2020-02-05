const url = 'https://randomuser.me/api/?format=prettyjson&noinfo';
// ------------------------XMLHttpRequest---------------------
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    console.log(xhr.response);
  }
};

xhr.open('GET', url);
xhr.send();

// -------------------------Using Axios---------------------

axios
  .get(url)
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.error(err);
  });
