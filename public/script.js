const email = document.getElementById('email');
const password = document.getElementById('password');
const errorWarning = document.getElementById('warning');


// Provide login button functionality
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', async () => {

  const data = {
    email: email.value,
    password: password.value,
  }
  if (!email.value || !password.value) {
    errorWarning.innerText = 'Please fill in all details';
    return;
  }

  try {
    const response = await axios.post('/login', data);
    const { token } = response.data;
    console.log('token', token);
    localStorage.setItem('AuthToken', token);
    window.location.replace("/game");
  } catch (error) {
    console.log(error)
  }
})

// Add register button functionality
const registerBtn = document.getElementById('register-button');

registerBtn.addEventListener('click', async () => {
  if (!email.value || !password.value) {
    errorWarning.innerText = 'Please fill in all details';
    return;
  }
  const data = {
    email: email.value,
    password: password.value,
  }
  try {
    const response = await axios.post('/register', data);
    // Obtain token data and store it in localStorage
    const { token } = response.data
    console.log('token', token)
    localStorage.setItem('AuthToken', token)
    window.location.replace("/game");
  } catch (error) {
    console.log(error);
  }
})

// // TO LOOK INTO ONCE SETUP GAME PAGE FOR AUTH REQUEST (start game)

// // --> USE TOKEN FOR PUT REQUEST

// $('#putButton').click(async () => {
//   JsLoadingOverlay.show()
//   const token = localStorage.getItem('sampleAuthToken')
//   if (!token) {
//     return alert(`No token found! Call the police!`)
//   } else {
//     const config = {
//       headers: { Authorization: `Bearer ${token}` }
//     };
//     try {
//       const result = await axios.put('/users', {}, config)
//       alert(`${result.data.success}`)
//       JsLoadingOverlay.hide()
//     } catch (err) {
//       alert(`got an error status of ${err.response.status}`)
//       JsLoadingOverlay.hide()
//     }

//   }
// })
