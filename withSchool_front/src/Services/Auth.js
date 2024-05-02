const url = 'http://223.130.134.181:8080';

exports.login = async (id, password) => {
  try {
    const body = {
      "id": id,
      "password": password
    };
    const response = await fetch(`${url}/basic/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  
    if (response.ok) { // 응답이 성공했는지 확인
      const data = await response.json();
      console.log('Login successful:', data);
      return data;
    } else {
      // 응답이 실패한 경우
      const errorMessage = await response.text(); // 서버에서 오류 메시지 받기
      console.error('Login failed:', errorMessage);
      throw new Error(errorMessage); // 오류를 던져서 아래 catch 블록으로 이동
    }
  } catch (error) {
    console.error('Error during login:', error);
    // 사용자에게 오류 메시지를 보여줄 수 있는 대안을 사용할 것을 권장
    // 예를 들어, 오류 메시지를 페이지에 표시하거나 모달 대화 상자를 사용할 수 있음
    // 사용자에게 더 나은 피드백을 제공하기 위해 alert 대신 사용
  }
  
}

exports.certify = async (schoolId, userName, birthDate, userCode) => {
  try {
    const body = {
      "schoolId": schoolId,
      "userName": userName,
      "birthDate": birthDate,
      "userCode": userCode
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
      console.log('Certify Success:', data.message);
    } else {
      console.error('Certify failed:', data.message);
    }
  } catch (error) {
    console.error('Error during certify:', error);
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