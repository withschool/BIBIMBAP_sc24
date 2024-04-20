const url = 'http://223.130.134.181:8080';

exports.login = async (id, password) => {
  try {
    const body = {
      "id" : id,
      "password" : password
    };
    const response = await fetch(`${url}/sign-in`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log('Login successful:', data);
      return data;
    } else {
      console.error('Login failed:', data.message);
      return Promise.reject(new Error(data.message));
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
}

exports.logout = async () => {
  try {
    const response = await fetch(`${url}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log('Logout successful:', data.message);
    } else {
      console.error('Logout failed:', data.message);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

exports.getId = async (user_id) => {
  try {
    const response = await fetch(`${url}/${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Invalid User Id:', error);
  }
}