import { redirect } from "react-router-dom";

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

interface RegisterBody {
  id: string;
  email: string;
  password: string;
  name: string;
  sex: boolean;
  phoneNumber: string;
  address: string;
  birthDate: string;
  accountType: number;
  userCode: string
}

interface EditBody {
  userId: number;
  email: string;
  phoneNumber: string;
  address: string;
}

interface PwEditBody {
  userId: number;
  password: string;
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

export const register = async (
  id: string,
  email: string,
  password: string,
  name: string,
  sex: boolean,
  phoneNumber: string,
  address: string,
  birthDate: string,
  accountType: number,
  userCode: string
  ): Promise<any> => {
  try {
    const body: RegisterBody = {
      id,
      email,
      password,
      name,
      sex,
      phoneNumber,
      address,
      birthDate,
      accountType,
      userCode
    };
    const response = await fetch(`${url}/basic/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.text();
      console.log('Register successful:', data);
      return data;
    } else {
      const errorMessage = await response.text();
      console.error('Register failed:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (errorss) {
    console.error('Register during login:', errorss);
    return -1;
  }
}

export const DuplicateId = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${url}/basic/is-duplicated?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Check Duplicate successful:', data);
      return data;
    } else {
      const errorMessage = await response.text();
      console.error('Check Duplicate failed:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (errorss) {
    console.error('Check Duplicate during Checking:', errorss);
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

export const getSchoolId = async (token: string): Promise<any> => {
  try {
    const response = await fetch(`${url}/schools/mySchool`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('School ID fetched successfully:', data);
      return data;
    } else {
      const errorMessage = await response.text();
      console.error('Failed to fetch school ID:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error during fetching school ID:', error);
  }
}

export const getClassId = async (token: string): Promise<any> => {
  try {
    const response = await fetch(`${url}/classes/myClass`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Class ID fetched successfully:', data);
      return data;
    } else {
      const errorMessage = await response.text();
      console.error('Failed to fetch Class ID:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error during fetching Class ID:', error);
  }
}

export const getUserInfobyId = async (id: string | null): Promise<any> => {
  try {
    const response = await fetch(`${url}/users/id/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('UserInfo fetched successfully:', data);
      return data;
    } else {
      const errorMessage = await response.text();
      console.error('Failed to fetch UserInfo:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error during fetching UserInfo:', error);
  }
}

export const getUserInfobyPK = async (userPk: number | null): Promise<any> => {
  try {
    const response = await fetch(`${url}/users/user-id/${userPk}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('UserInfo fetched successfully:', data);
      return data;
    } else {
      const errorMessage = await response.text();
      console.error('Failed to fetch UserInfo:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error during fetching UserInfo:', error);
  }
}

export const editUser = async (userId: number, email: string, phoneNumber: string, address: string): Promise<any> => {
  try {
    const body: EditBody = {
      userId,
      email,
      phoneNumber,
      address
    };

    const response = await fetch(`${url}/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      console.log('Edit user Success:', data);
      return data;
    } else {
      console.error('Edit user failed:', data.message);
    }
  } catch (error) {
    console.error('Error during edit user:', error);
  }
}

export const editUserPw = async (userId: number, password: string): Promise<any> => {
  try {
    const body: PwEditBody = {
      userId,
      password
    };

    const response = await fetch(`${url}/users/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      console.log('Edit user Success:', data);
      return data;
    } else {
      console.error('Edit user failed:', data.message);
    }
  } catch (error) {
    console.error('Error during edit user:', error);
  }
}