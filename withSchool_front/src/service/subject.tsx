const url = 'http://223.130.134.181:8080';

export const getSubjects = async (): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/subjects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const convertData = JSON.stringify(data);
            return convertData;
        } else {
            const errorMessage = await response.text();
            console.error('과목 목록 가져오기 실패:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('과목 목록 API 실패', error);
        throw error;
    }
};

export const createSubject = async (subjectName: string, subjectYear: string, subjectSemester: string, subjectGrade: string): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/admin/subjects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                subjectName : '가즈아',
                subjectYear : '2024',
                subjectSemester : '1',
                subjectGrade : '2',
            })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('과목 생성 실패:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('과목 생성 API 실패', error);
        throw error;
    }
};