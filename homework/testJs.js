// me ayto prosthetei ta repos san option sto select element

const select = createAndAppend('select', ul);

repos.forEach(repo => {
  select.innerHTML += `<option> ${repo.name}</option>`;
  console.log(repo);
});
