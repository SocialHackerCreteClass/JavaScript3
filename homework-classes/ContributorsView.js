'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      contributors.forEach(contributor => {
        createAndAppend('li', document.getElementById('contributors-list'), {
          text: `<img src="${contributor.avatar_url}" alt="${contributor.login}">
          <a target="_blank" href="${contributor.html_url}">${contributor.login}</a>
          <b>${contributor.contributions}</b>`
        });
      })
    }
  }

  window.ContributorsView = ContributorsView;
}
