'use strict';

let body = document.querySelector('body');
body.id = 'body';

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

  function fetchContributors(repo) {
    fetch(repo.contributors_url)
      .then(response => {
        return response.json();
      })
      .then(contributors => {
        console.log(contributors);
      });
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

  function renderContributors(contributors, contributorsBanner) {
    contributors.forEach(contributor => {
      let contLi = createAndAppend('li', contributorsBanner);
      let contImage = createAndAppend('img', contributorsBanner);
      contImage.setAttribute('href', contributor.avatar_url);

      let contName = createAndAppend('p', contLi);
      contName.innerHTML = contributor.login;
      contLi.appendChild(contImage);
      contImage.appendChild(contName);
    });
  }

  /////////////////////////////////////////////////////////////////////MAIN FUNCTION STARTS HERE////////////////////////////////////////////////////////////////////////////////////////
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
      ///crreating repos banner
      let reposBanner = document.createElement('section');
      reposBanner.innerHTML = 'HYF REPOSITORIES';
      reposBanner.className += 'banner';
      ///creating contributors banner
      let contributorsBanner = document.createElement('section');
      contributorsBanner.className = ' contributors banner';
      contributorsBanner.innerHTML = 'Contributors';

      document.getElementById('root').appendChild(reposBanner);
      document.getElementById('root').appendChild(contributorsBanner);

      const ul = createAndAppend('ul', root);
      const select = createAndAppend('select', reposBanner);

      let startingRepo = repos[0];

      renderRepoDetails(startingRepo, ul);
      fetchContributors(startingRepo);

      repos.forEach(repo => {
        let option = document.createElement('option');
        option.innerHTML = repo.name;
        option.value = repo.name;
        select.appendChild(option);

        let selectBtn = document.querySelector('select');
        let li = document.querySelector('li');
        let div = document.getElementById('root');

        selectBtn.addEventListener('change', () => {
          if (selectBtn.value == repo.name) {
            ul.innerHTML = ' ';
            renderRepoDetails(repo, ul);
            fetchContributors(repo);
          }
        });
      });
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
