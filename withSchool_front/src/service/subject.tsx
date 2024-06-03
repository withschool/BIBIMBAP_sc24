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
            return data; // Return parsed JSON object
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

export const getSubjectsParent = async (childId : number): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/subjects?childId=${childId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data; // Return parsed JSON object
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
                subjectName,
                subjectYear,
                subjectSemester,
                subjectGrade,
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


export const getSubjectList = async (): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(`서버 데이타 ${JSON.stringify(data)}`);
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch school notice:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching school notice:', error);
        throw error;
    }
}

export const deleteSubject = async (subjectId: number): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/admin/subjects/${subjectId}`, {
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


export const getSubjectInfo = async (subjectId: string | null): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/${subjectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch subject information:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching subject information:', error);
        throw error;
    }
}

export const getLectureNoteList = async (subjectId: string | null): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/lecture-notes/bySubject/${subjectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch subject information:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching subject information:', error);
        throw error;
    }
}

interface LectureNoteBody {
    title: string;
    id: string | null;
    file: string;
}

export const createLectureNote = async (formData: FormData): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/lecture-notes`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch subject information:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching subject information:', error);
        throw error;
    }
}

export const updateLectureNote = async (formData: FormData, id: string): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/lecture-notes/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch subject information:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching subject information:', error);
        throw error;
    }
}

export const deleteLectureNote = async (id: string): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/lecture-notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch subject information:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching subject information:', error);
        throw error;
    }
}


export const getStudentList = async (subjectId: string | null): Promise<any> => {
    try {
        const response = await fetch(`${url}/sugangs/${subjectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch subject information:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching subject information:', error);
        throw error;
    }
}

export const enrollScore = async (type: String, userScoreList : any[]): Promise<any> => {
    try {
        const response = await fetch(`${url}/sugangs/scores`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "type" : type,
                "userScoreList" : userScoreList
            })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch subject information:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching subject information:', error);
        throw error;
    }
}

export const getStudentScoreParent = async (subjectId : String, childId: string | null): Promise<any> => {
    try {
        const response = await fetch(`${url}/sugangs/${subjectId}/scores?childId=${childId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch subject information:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching subject information:', error);
        throw error;
    }
}