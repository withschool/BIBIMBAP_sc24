const url = 'http://223.130.134.181:8080';

export const getCounselInfo = async (): Promise<any> => {
    try {
        const response = await fetch(`${url}/counsels`, {
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
}

export const getTeacherListStudent = async (): Promise<any> => {
    try {
        const response = await fetch(`${url}/counsels/partners`, {
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
}

export const getTeacherListParent = async (childId : string | null): Promise<any> => {
    try {
        const response = await fetch(`${url}/counsels/partners?childId=${childId}`, {
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
}

interface CounselBody {
    answererId: number;
    category: string;
    schedule: string;
}

export const registerCounsel = async (answererId: number, category: string, schedule: string): Promise<any> => {
    try {
        const body: CounselBody= {
            answererId,
            category,
            schedule
        };

        const response = await fetch(`${url}/counsels`, {
            method: 'POST',
            body: JSON.stringify(body),
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
}

export const deleteCounsel = async (counselId: number): Promise<any> => {
    try {
        const response = await fetch(`${url}/counsels/${counselId}`, {
            method: 'DELETE',
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
}

export const getRequestCounsel = async (): Promise<any> => {
    try {
        const response = await fetch(`${url}/counsels/requested-counsels/activated`, {
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
}

export const getTotalCounsel = async (): Promise<any> => {
    try {
        const response = await fetch(`${url}/counsels/requested-counsels`, {
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
}

export const assignCounsel = async (counselId : string, isAccept : number): Promise<any> => {
    try {
        const response = await fetch(`${url}/counsels/${counselId}?isAccept=${isAccept}`, {
            method: 'POST',
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
}