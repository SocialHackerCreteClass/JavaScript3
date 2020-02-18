'use strict';

{
    function fetchJSON(url, cb) {
        // const xhr = new XMLHttpRequest();
        // xhr.open('GET', url);
        // xhr.responseType = 'json';
        // xhr.onload = () => {
        //     if (xhr.status >= 200 && xhr.status <= 299) {
        //         cb(null, xhr.response);
        //     } else {
        //         cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
        //     }
        // };
        // xhr.onerror = () => cb(new Error('Network request failed'));
        // xhr.send();

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw response
                }
                return response.json()
            })
            .then((data) => {
                cb(null, data);
            })
            .catch((err) => {
                cb(new Error('Network request failed'));
            });
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
            text: `<strong>Repository:</strong> <a href="${repo.html_url}">${repo.name}</a><br><span class="description"><strong>Description:</strong> ${repo.description}</span><br><strong>Forks:</strong> ${repo.forks}<br><span class="updated"><strong>Updated:</strong> ${fixFormatDate(repo.updated_at)}</span>`,
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

    // Load the contributors container
    const loadContributors = (url) => {
        fetchJSON(url, (err, contributors) => {
            contributors_container.innerHTML = '';

            createAndAppend('h3', contributors_container, {
                id: 'contributors__title',
                text: 'Contributions'
            });
            var contributorsList = createAndAppend('ul', contributors_container, {
                id: 'contributors__list'
            });

            if (contributors) {
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
            }


            if (err) {
                createAndAppend('li', contributorsList, {
                    text: `Network Request Failed`,
                    class: 'alert-error',
                });
                return;
            }
        });
    }


    function main(url) {

        fetchJSON(url, (err, repos) => {
            const root = document.getElementById('root');
            // CREATE THE HEADER
            const hyfElem = createAndAppend('div', root, {
                text: `HYF Repositories`,
                style: `padding: 1.5rem; color: white; background-color: #4567d8`,
                id: 'hyf__header'
            });

            const data_container = createAndAppend('div', root, {
                id: 'data__container'
            })

            const list_container = createAndAppend('div', data_container, {
                id: 'list__container'
            });
            const ul = createAndAppend('ul', list_container);

            if (repos) {
                // Sort the repos array
                let sortRepos = sortArrayAlpha(repos);

                // Create the SELECT item
                const selectElem = createAndAppend('select', hyfElem, {
                    name: 'repos',
                    id: 'repos__select'
                })

                sortRepos.forEach(repo => {
                    createAndAppend('option', selectElem, {
                        text: repo.name,
                        value: repo.name
                    });
                });


                renderRepoDetails(sortRepos[0], ul);

                const contributors_container = createAndAppend('div', data_container, {
                    id: 'contributors_container'
                })

                loadContributors(sortRepos[0].contributors_url);

                // Make the repos have only specific number of items eg. 10
                const sizeRepos = (num) => {
                    const reposSized = [];
                    for (let i = 0; i < num; i++) {
                        reposSized.push(sortRepos[i]);
                    }
                    return reposSized;
                }

                selectElem.addEventListener('change', e => {
                    ul.innerHTML = '';
                    sortRepos.forEach(repo => {
                        if (repo.name === e.target.value) {
                            renderRepoDetails(repo, ul);
                            loadContributors(repo.contributors_url);
                        }
                    });
                })
            }


            if (err) {
                createAndAppend('li', ul, {
                    text: `Network Request Failed`,
                    class: 'alert-error',
                });
                return;
            }

            // sizeRepos(10).forEach(repo => renderRepoDetails(repo, ul));
        });
    }

    const HYF_REPOS_URL =
        'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    window.onload = () => main(HYF_REPOS_URL);
}
