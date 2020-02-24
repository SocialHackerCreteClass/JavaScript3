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
        xhr.onerror = () => cb(new Error('Network request faileddddd'));
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
            text: `<strong>Repository:</strong> <a href="">${repo.name}</a><br><span class="description"><strong>Description:</strong> ${repo.description}</span><br><strong>Forks:</strong> ${repo.forks}<br><span class="updated"><strong>Updated:</strong> ${fixFormatDate(repo.updated_at)}</span>`,
            style: `padding: 1.5rem`
        });
    }


    // Sort the arrays, eg. repos
    const sortArrayAlpha = (array) => {
        let sortedArray = array.sort(function (a, b) {
            let textA = a.name.toUpperCase();
            let textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        return sortedArray;
    }


    function main(url) {

        fetchJSON(url, (err, repos) => {
            const root = document.getElementById('root');

            const ul = createAndAppend('ul', root);

            // CREATE THE HEADER
            createAndAppend('li', ul, {
                text: `HYF Repositories`,
                style: `padding: 1.5rem; color: white; background-color: #842BD7`
            });

            if (err) {
                createAndAppend('li', ul, {
                    //text: err.message,
                    text: `Network Request Failed`,
                    class: 'alert-error',
                });
                return;
            }

            // Sort the repos array
            let sortRepos = sortArrayAlpha(repos);

            // Make the repos have only specific number of items eg. 10
            const sizeRepos = (num) => {
                const reposSized = [];
                for (let i = 0; i < num; i++) {
                    reposSized.push(sortRepos[i]);
                }
                return reposSized;
            }


            sizeRepos(10).forEach(repo => renderRepoDetails(repo, ul));
        });
    }

    const HYF_REPOS_URL =
        'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    window.onload = () => main(HYF_REPOS_URL);
}