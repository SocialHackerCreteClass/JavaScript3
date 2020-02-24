'use strict';

{
  const accounts = {
    hyf: {
      name: 'HackYourFuture',
      type: 'org',
    },
    microsoft: {
      name: 'Microsoft',
      type: 'org',
    },
    jim: {
      name: 'remarcmij',
      type: 'user',
    },
  };

  const { Model, HeaderView, RepoView, ContributorsView, ErrorView } = window;
  const { createAndAppend } = window.Util;

  class App {
    constructor(account) {
      const containers = App.renderContainers(account);

      const model = new Model(account);
      const fetchData = model.fetchData.bind(model);

      model.subscribe(new HeaderView(account, containers.header, fetchData));
      model.subscribe(new RepoView(containers.repo));
      model.subscribe(new ContributorsView(containers.contributors));
      model.subscribe(new ErrorView(containers.error));

      fetchData();
    }

    static renderContainers(account) {
      const root = document.getElementById('root');
      const header = createAndAppend('div', root, { class: 'header', text: account.name, id: 'hyf__header' });
      const error = createAndAppend('div', root);
      const main = createAndAppend('div', root, {
        class: 'main-container',
      });
      const repo = createAndAppend('ul', main, {
        class: 'repo-container whiteframe',
      });
      const contributors = createAndAppend('section', main, {
        class: 'contributors-container whiteframe',
      });
      return { header, error, main, repo, contributors };
    }
  }

  const ACCOUNT_KEY = 'hyf';
  window.onload = () => new App(accounts[ACCOUNT_KEY]);
}
