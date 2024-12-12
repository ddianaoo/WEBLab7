document.querySelector('.sign-in-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const form = event.target;
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
  
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = '';
  
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
      const response = await fetch('https://travel-app-api.up.railway.app/api/v1/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.detail) {
          showAlert('danger', `Помилка: ${errorData.detail}`);
        } else {
          showAlert('danger', 'Помилка входу. Перевірте введені дані.');
        }
        return;
      }
  
      showAlert('success', 'Вхід успішний! Ви будете перенаправлені на головну сторінку.');
      setTimeout(() => {
        window.location.href = './lab1.html';
      }, 2000);
    } catch (error) {
      showAlert('danger', 'Помилка мережі. Спробуйте пізніше.');
      console.error(error);
    }
  });
  
  function showAlert(type, message) {
    const errorContainer = document.getElementById('error-container');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.textContent = message;
    errorContainer.appendChild(alertDiv);
  }
  