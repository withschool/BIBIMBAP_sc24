const url = 'http://223.130.134.181:8080';

export const getSchoolUsers = async (): Promise<any> => {
    try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await fetch(`${url}/admin/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the token to the Authorization header
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('전체 유저 가져오기 실패:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('전체 유저 API 실패', error);
        throw error;
    }
};

export const uploadUserFile = async (file: File): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${url}/admin/users-file`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const contentType = response.headers.get('Content-Type');
        if (response.ok) {
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                return data;
            } else {
                const text = await response.text();
                return text;
            }
        } else {
            const errorMessage = await response.text();
            console.error('유저 파일 업로드 실패:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('유저 파일 업로드 API 실패', error);
        throw error;
    }
};