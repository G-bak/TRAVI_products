/* -------------------------------------------------------------------------- */
/*                               Form-submission                              */
/* -------------------------------------------------------------------------- */

const formSubmissionInit = () => {
  const forms = document.querySelectorAll('.posh-form');

  if (forms.length) {
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submit = form.querySelector('[type="submit"]');
        const submitText = submit.value;
        submit.value = 'Sending...';

        const formData = new FormData(form);
        fetch('/url', {
          method: 'POST',
          body: formData
        })
          .then((response) => {
            response.text();
          })
          .then((result) => {
            form.querySelector('.form-feedback').innerHTML = result != null ? result : '';
            submit.value = submitText;
          })
          .catch((error) => {
            console.log(error);
            submit.value = submitText;
          });
      });
    });
  }
};

export default formSubmissionInit;
