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
      // TODO: replace this comment and the console.log with your own code
      this.container.innerHTML = '';

      createAndAppend('h3', this.container, {
        id: 'contributors__title',
        text: 'Contributions'
      });

      const contributorsList = createAndAppend('ul', this.container, {
        id: 'contributors__list'
      });

      contributors.forEach(contributor => {
        const contributorElem = createAndAppend('li', contributorsList, {
          class: 'contributor__element'
        });
        const nameImgElem = createAndAppend('div', contributorElem, {
          class: 'contributor__name-container'
        })
        createAndAppend('img', nameImgElem, {
          class: 'contributor__image',
          src: contributor.avatar_url,
          style: 'height: 50px; width:50px'
        });
        createAndAppend('a', nameImgElem, {
          text: contributor.login,
          href: contributor.html_url
        });
        createAndAppend('div', contributorElem, {
          text: contributor.contributions,
          class: 'contributions__count'
        })
      });
      // console.log('ContributorsView', contributors);
    }
  }

  window.ContributorsView = ContributorsView;
}
