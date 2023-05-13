
const loginForm = document.getElementById("login-form");
const content = document.getElementById("content");


function showContent() {
  window.location.href = "index.html";
}


document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = {
    email: email,
    password: password
  };

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      showContent();
    } else {
      alert(data.error);
    }
  })
  .catch(error => console.error(error));
});
