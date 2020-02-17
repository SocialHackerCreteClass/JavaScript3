// me ayto prosthetei ta repos san option sto select element

const select = createAndAppend('select', ul);

repos.forEach(repo => {
  let option = document.createElement('option');
  option = repo.name;
  option.value = repo.name;
  select.appendChild(option);
  console.log(repo);
});
