'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, ul) {
    createAndAppend('li', ul, { text: ` Repository : ${repo.name}` });
    let a = createAndAppend('a', ul, { text: repo.name });
    a.setAttribute('href', repo.html_url);
    a.setAttribute('target', '_blank');
    createAndAppend('p', ul, { text: `Description : ${repo.description}` });
    createAndAppend('p', ul, { text: `Forks : ${repo.forks}` });
    var dateobj = new Date(repo.updated_at);
    var updateDate = dateobj.toUTCString();

    createAndAppend('p', ul, { text: `Update at : ${updateDate}` });
  }

  let reposBanner = document.createElement('H1');
  reposBanner.innerHTML = 'HYF REPOSITORIES';
  document.getElementById('root').appendChild(reposBanner);
  reposBanner.className += 'banner';

  function main(url) {
    fetchJSON(url, (err, repos) => {
      // "repos" is a referrence to xhr response. all this is part of the predefined callback function
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const ul = createAndAppend('ul', root);
      repos.sort(function(a, b) {
        return a.name.toUpperCase() > b.name.toUpperCase()
          ? 1
          : b.name.toUpperCase() > a.name.toUpperCase()
          ? -1
          : 0;
      });

      let reposIndices = [];
      for (let x = 0; x < 10; x++) {
        reposIndices.push(repos[x]);
      }

      repos = reposIndices;
      console.log(repos);

      const select = createAndAppend('select', ul);

      repos.forEach(repo => {
        select.innerHTML += `<option> ${repo.name}</option>`;
        console.log(repo);
      });

      repos.forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
