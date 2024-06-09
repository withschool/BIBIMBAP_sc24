const url = 'http://223.130.134.181:8080';

export const getHomeworkList = async (subjectId: string): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/${subjectId}/homeworks`, {
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
            console.error('Failed to fetch school notice:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching school notice:', error);
        throw error;
    }
};

export const makeHomework = async (formData: FormData): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/homeworks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw error;
    }
};

export const deleteHomework = async (homeworkId: string): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/homeworks/${homeworkId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw error;
    }
};

export const editHomework = async (formData: FormData, homeworkId : string): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/homeworks/${homeworkId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw error;
    }
};

export const makeSubmitHomework = async (formData: FormData): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/students/homeworks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw error;
    }
};

export const deleteSubmitHomework = async (subjectHomeworkSubmitId: string): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/students/homeworks/${subjectHomeworkSubmitId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw error;
    }
};

export const editSubmitHomework = async (formData: FormData, subjectHomeworkSubmitId : string): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/students/homeworks/${subjectHomeworkSubmitId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw error;
    }
};

export const getSubmitHomeworkList = async (homeworkId : string): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/students/submit-homeworks/list/${homeworkId}`, {
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
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw error;
    }
};

export const isSumbitHomework = async (homeworkId : string): Promise<any> => {
    try {
        const response = await fetch(`${url}/subjects/students/homeworks/${homeworkId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw error;
    }
};