'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code
      this.container.innerHTML = '';

      // Fix the format of the date
      const fixFormatDate = (myDate) => {
        let [date, time] = myDate.split('T');
        let [year, month, day] = date.split('-');
        let [timeClean] = time.split('Z');
        let [hour, minutes, seconds] = timeClean.split(':');
        if (hour > 12) {
          hour = hour - 12;
          var time_ind = 'PM';
        } else {
          var time_ind = 'AM';
        }
        let fixedDate = `${day}/${month}/${year}, ${hour}:${minutes}:${seconds} ${time_ind}`;

        return fixedDate;
      }


      function renderRepoDetails(repo, ul) {

        createAndAppend('li', ul, {
          text: `<strong>Repository:</strong> <a href="${repo.html_url}">${repo.name}</a><br><span class="description"><strong>Description:</strong> ${repo.description}</span><br><strong>Forks:</strong> ${repo.forks}<br><span class="updated"><strong>Updated:</strong> ${fixFormatDate(repo.updated_at)}</span>`,
          style: `padding: 1.5rem`
        });
      }

      // const data_container = createAndAppend('div', root, {
      //   id: 'data__container'
      // })

      const list_container = createAndAppend('div', this.container, {
        id: 'list__container'
      });
      const ul = createAndAppend('ul', list_container);


      renderRepoDetails(repo, ul);

      // selectElem.addEventListener('change', e => {
      //   ul.innerHTML = '';
      //   sortRepos.forEach(repo => {
      //     if (repo.name === e.target.value) {
      //       renderRepoDetails(repo, ul);
      //       loadContributors(repo.contributors_url);
      //     }
      //   });
      // })
      // console.log('RepoView', repo);
    }
  }

  window.RepoView = RepoView;
}
