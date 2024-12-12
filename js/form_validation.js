document.querySelector('.sign-up-form').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const form = event.target;
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
  
    let isValid = true;
  
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((message) => {
      message.textContent = '';
      message.style.display = 'none';
    });
    const inputs = form.querySelectorAll('.input');
    inputs.forEach((input) => input.classList.remove('error'));
  
    if (!/^[a-zA-Zа-яА-ЯґҐєЄіІїЇ']+\s+[a-zA-Zа-яА-ЯґҐєЄіІїЇ']+$/.test(fullName)) {
      const errorElement = document.querySelector('[data-error-for="fullName"]');
      errorElement.textContent = "Будь ласка, введіть повне ім'я (ім'я та прізвище).";
      errorElement.style.display = 'block';
      form.fullName.parentElement.classList.add('error');
      isValid = false;
    }
  
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      const errorElement = document.querySelector('[data-error-for="email"]');
      errorElement.textContent = 'Електронна пошта повинна бути дійсною та з доменом gmail.com.';
      errorElement.style.display = 'block';
      form.email.parentElement.classList.add('error');
      isValid = false;
    }
  
    if (password.length < 6) {
      const errorElement = document.querySelector('[data-error-for="password"]');
      errorElement.textContent = 'Пароль повинен містити не менше 6 символів.';
      errorElement.style.display = 'block';
      form.password.parentElement.classList.add('error');
      isValid = false;
    }
  
    if (!isValid) return;
  
    try {
      const response = await fetch('https://travel-app-api.up.railway.app/api/v1/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || 'Помилка реєстрації. Перевірте введені дані.';
        showError(errorMessage);
        return;
      }
  
      showSuccess('Реєстрація успішна! Ви будете перенаправлені на сторінку входу.');
      setTimeout(() => {
        window.location.href = './sign-in.html';
      }, 2000);
    } catch (error) {
      showError('Помилка мережі. Спробуйте пізніше.');
      console.error(error);
    }
  });
  
  function showError(message) {
    const errorContainer = document.getElementById('error-container');
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-danger';
    errorAlert.role = 'alert';
    errorAlert.textContent = message;
    errorContainer.appendChild(errorAlert);
  }
  
  function showSuccess(message) {
    const errorContainer = document.getElementById('error-container');
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success';
    successAlert.role = 'alert';
    successAlert.textContent = message;
    errorContainer.appendChild(successAlert);
  }
  