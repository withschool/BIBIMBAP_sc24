const url = 'http://223.130.134.181:8080';

export const mappingStudent = async (userCode: string): Promise<any> => {
    try {
      const response = await fetch(`${url}/mapping/student-parent?userCode=${userCode}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.ok) {
        console.log('매핑 완료');
        return true;
      } else {
        const errorMessage = await response.text();
        console.error('매핑 실패:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (errorss) {
      console.error('매핑 실패: 걍 안됨', errorss);
      return false;
    }
}

export const listingStudent = async (): Promise<any> => {
    try {
      const response = await fetch(`${url}/mapping`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.ok) {
        console.log('불러오기 완료');
        const data = await response.json();
        return data;
      } else {
        const errorMessage = await response.text();
        console.error('불러오기 실패:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (errorss) {
      console.error('불러오기 실패: 걍 안됨', errorss);
    }
}