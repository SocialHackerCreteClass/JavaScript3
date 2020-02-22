'use strict';

{
  const { createAndAppend, formatDate } = window.Util;

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
      createAndAppend('div', document.getElementById('root'), {
        text: `
        <b>Repository:</b> <a href="${repo.html_url}" target="_blank">${repo.name}</a><br>
        <b>Description:</b> ${repo.description}<br>
        <b>Forks:</b> ${repo.forks_count}<br>
        <b>Updated:</b> ${formatDate(repo.updated_at)}`,
        class: 'repo'
      });
    }
  }

  window.RepoView = RepoView;
}
