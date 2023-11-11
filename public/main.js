// REGISTER
let openRegisterModal = document.getElementById('openModalButton');

if (openRegisterModal) {
    openRegisterModal.addEventListener('click', function() {
        document.getElementById('modal').style.display = 'block';
    });
}

  
  window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('modal')) {
      document.getElementById('modal').style.display = 'none';
    }
  });
  

  let registerFormButton = document.getElementById('registrationForm');

  if (registerFormButton) {
    registerFormButton.addEventListener('submit', function(event) {
        event.preventDefault();
      
        var email = document.getElementById('email').value;
        var login = document.getElementById('login').value;
        var password = document.getElementById('password').value;
      
        fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            login: login,
            password: password
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'User registered successfully') {
            alert('User registered successfully');
            document.getElementById('modal').style.display = 'none';
          } else {
            alert(data.message);
          }
        })
        .catch(error => console.error('Error:', error));
      });
  }




// LOGIN 

let openLoginModal = document.getElementById('openLoginModalButton');

if (openLoginModal) {
    openLoginModal.addEventListener('click', function() {
        document.getElementById('loginModal').style.display = 'block';
    });
}

  
  window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('loginModal')) {
      document.getElementById('loginModal').style.display = 'none';
    }
  });
  

  let loginFormbutton = document.getElementById('loginForm');

  if (loginFormbutton) {
    loginFormbutton.addEventListener('submit', function(event) {
        event.preventDefault();
      
        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;
      
        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'User logged in successfully') {
            alert('User logged in successfully');
            document.getElementById('loginModal').style.display = 'none';
          } else {
            alert(data.message);
          }
        })
        .catch(error => console.error('Error:', error));
      });
  }




// LOGOUT 

let logoutBtn = document.getElementById('logoutButton');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(event) {
        event.preventDefault();
      
        fetch('/logout', {
          method: 'POST',
        })
        .then(response => {
          if (response.ok) {
            alert('User logged out successfully');
            // Здесь вы можете обновить интерфейс пользователя, чтобы отразить состояние выхода из системы
          } else {
            alert('Error logging out, please try again');
          }
        })
        .catch(error => console.error('Error:', error));
      });
}
