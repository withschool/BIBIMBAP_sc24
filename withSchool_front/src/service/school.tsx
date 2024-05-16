const url = 'http://223.130.134.181:8080';

export const getSchoolList = async (): Promise<any> => {
    try {
        const response = await fetch(`${url}/basic/schools`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch school list:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching school list:', error);
        throw error;
    }
}

export const createSchool = async (schoolData: any): Promise<any> => {
    try {
        const response = await fetch(`${url}/super/schools`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(schoolData)
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to create school:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error creating school:', error);
        throw error;
    }
}

