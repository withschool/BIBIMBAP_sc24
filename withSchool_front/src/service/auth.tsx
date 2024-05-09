const url = 'http://223.130.134.181:8080';

interface LoginBody {
  id: string;
  password: string;
}

interface CertifyBody {
  schoolId: string;
  userName: string;
  birthDate: string;
  userCode: string;
}

export const login = async (id: string, password: string): Promise<any> => {
  try {
    const body: LoginBody = {
      id,
      password
    };
    const response = await fetch(`${url}/basic/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login successful:', data);
      return data;
    } else {
      const errorMessage = await response.text();
      console.error('Login failed:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (errorss) {
    console.error('Error during login:', errorss);
  }
}

export const certify = async (schoolId: string, userName: string, birthDate: string, userCode: string): Promise<any> => {
  try {
    const body: CertifyBody = {
      schoolId,
      userName,
      birthDate,
      userCode
    };

    const response = await fetch(`${url}/basic/pre-sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log('Certify Success:', data);
      return data;
    } else {
      console.error('Certify failed:', data.message);
    }
  } catch (error) {
    console.error('Error during certify:', error);
  }
}

export const getId = async (user_id: string): Promise<any> => {
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