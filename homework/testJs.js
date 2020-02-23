

 let selectBtn = document.querySelector('select');
 selectBtn.addEventListener('change', () => {
   if (selectBtn.value == repo.name) {
    ul.replaceChild(repo, startingRepo);
   }