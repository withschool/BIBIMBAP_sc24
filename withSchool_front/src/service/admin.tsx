const url = 'http://223.130.134.181:8080';

export const getSchoolUsers = async (): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/admin/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

export const getAdminClasses = async (grade: number): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/admin/classes/byUser?grade=${grade}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('반 정보 가져오기 실패:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('반 정보 API 실패', error);
        throw error;
    }
};

export const createClass = async (grade: number, inClass: number): Promise<any> => {
    try {

        const token = localStorage.getItem('token');
        const schoolId = parseInt(localStorage.getItem('schoolId') ?? '0');

        const response = await fetch(`${url}/admin/classes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                year: 2024,
                grade: grade,
                inClass: inClass,
                schoolId: schoolId
            })
        });

        if (response.ok) {
            return response;
        } else {
            const errorMessage = await response.text();
            console.error('반 생성 실패:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('반 생성 API 실패', error);
        throw error;
    }
};

export const deleteClass = async (classId: number): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/admin/classes/${classId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            return response;
        } else {
            const errorMessage = await response.text();
            console.error('반 삭제 실패:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('반 삭제 API 실패', error);
        throw error;
    }
};

const proxyUrl = 'http://www.withschool.site:8080/';


export const isPasswordModified = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${proxyUrl}${url}/admin/users/is-modified`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('비밀번호 수정 확인 실패:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('비밀번호 수정 확인 API 실패', error);
        throw error;
    }
};

export const updatePassword = async (userId: number, password: string): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/users/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, password })
        });

        if (response.ok) {
            return response;
        } else {
            const errorMessage = await response.text();
            console.error('비밀번호 수정 실패:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('비밀번호 수정 API 실패', error);
        throw error;
    }
};