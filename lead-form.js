(function () {
  var form = document.getElementById('lead-form');
  if (!form) return;

  var btn = document.getElementById('lead-submit-btn');
  var msg = document.getElementById('lead-form-msg');
  var card = document.getElementById('form-card');
  var btnDefaultText = btn.textContent;
  var fineDefaultText = msg.textContent;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var payload = {
      fio: form.fio.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      company: form.company.value.trim(),
      volume: form.volume.value,
      hp_field: form.hp_field.value
    };

    btn.disabled = true;
    btn.textContent = 'Отправляем…';
    msg.textContent = fineDefaultText;
    msg.classList.remove('form-fine-error');

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (resp) {
      if (!resp.ok) throw new Error('bad status ' + resp.status);
      return resp.json();
    }).then(function () {
      card.innerHTML = '<p class="form-thanks">Спасибо! Свяжемся в течение рабочего дня.</p>';
    }).catch(function () {
      btn.disabled = false;
      btn.textContent = btnDefaultText;
      msg.textContent = 'Не получилось отправить, напишите на bereznev.msk@yandex.ru напрямую';
      msg.classList.add('form-fine-error');
    });
  });
})();
