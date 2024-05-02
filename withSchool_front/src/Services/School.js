const url = 'http://223.130.134.181:8080';

exports.getSchoolList = async () => {
    try {
        const response = await fetch(`${url}/basic/schools`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) { // 응답이 성공했는지 확인
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text(); // 서버에서 오류 메시지 받기
            console.error('Failed to fetch school list:', errorMessage);
            throw new Error(errorMessage); // 오류를 던져서 아래 catch 블록으로 이동
        }
    } catch (error) {
        console.error('Error fetching school list:', error);
        throw error;
    }
}