// Mobile menu
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// Quote request form: sends to Formspree without leaving the page
(function () {
  var form = document.getElementById('quote-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var button = form.querySelector('button[type="submit"]');

  function say(message, isError) {
    status.textContent = message;
    status.classList.toggle('error', !!isError);
    status.focus();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      say('This form is not connected yet. Please text 360-708-4162 or email inclineconstruction25@gmail.com.', true);
      return;
    }
    button.disabled = true;
    button.textContent = 'Sending…';
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (response) {
      if (!response.ok) throw new Error('send failed');
      form.reset();
      say('Quote request sent. Thank you — we will be in touch soon.');
    }).catch(function () {
      say('Your request did not send. Please try again, or text 360-708-4162.', true);
    }).then(function () {
      button.disabled = false;
      button.textContent = 'Send quote request';
    });
  });
})();
