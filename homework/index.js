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
        elem.innerHTML = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, parent) {
    console.log(repo);
    createAndAppend('div', parent, {
      text: `
      <b>Repository:</b> <a href="${repo.html_url}" target="_blank">${repo.name}</a><br>
      <b>Description:</b> ${repo.description}<br>
      <b>Forks:</b> ${repo.forks_count}<br>
      <b>Updated:</b> ${formatDate(repo.updated_at)}`,
      class: 'repo'
    });
  }

  function renderContributorsDetails(contributor, parent){
    createAndAppend('li', parent, {
      text: `<img src="${contributor.avatar_url}" alt="${contributor.login}">
      <a target="_blank" href="${contributor.html_url}">${contributor.login}</a>
      <b>${contributor.contributions}</b>`
    });
  }

  function addNamesToDropDown(repo, select) {
    createAndAppend('option', select, {
      text: repo.name,
      value: repo.name
    });
  }

  function formatDate(date) {
    const newDate = new Date(date);
    let hours = newDate.getHours();
    let amPm;
    let minutes = newDate.getMinutes().toString();
    let seconds = newDate.getSeconds().toString();

    if (minutes < 10) {
      minutes = `0${hours}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (newDate.getHours() > 12) {
      hours = hours - 12;
      amPm = 'PM'
    } else {
      amPm = 'AM'
    }
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}, ${hours}:${minutes}:${seconds} ${amPm}`;
  }

  function sortObjects(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  function getContributors(repo) {
    fetchJSON(`https://api.github.com/repos/HackYourFuture/${repo}/contributors`, (err, contributors) => {
      const root = document.getElementById('repo-container');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const ul = document.getElementById('contributors-container');
      contributors.forEach(contributor => renderContributorsDetails(contributor, ul));
    });
  }

  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('repo-container');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }

      const repoContainer = document.getElementById('repo-container');
      const select = document.getElementById('names');

      repos.sort(sortObjects);
      repos.forEach(repo => addNamesToDropDown(repo, select));
      renderRepoDetails(repos[0], repoContainer);
      getContributors(repos[0].name);
      select.addEventListener('change', () => {
        document.getElementById('contributors-container').innerHTML = '';
        repoContainer.innerHTML = '';
        // This here finds the index of the repo we are looking for
        // using the value selected in `select`
        renderRepoDetails(
          repos[repos.findIndex(el => el.name === select.options[select.selectedIndex].value)],
          repoContainer
        );
        getContributors(select.options[select.selectedIndex].value);
      })
    });
  }

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
