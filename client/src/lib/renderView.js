function renderView(templateId) {
  const main = document.querySelector('#main-content');
  const template = document.querySelector('#' + templateId);

  main.innerHTML = template.innerHTML;
}

export default renderView;
