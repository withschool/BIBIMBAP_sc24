const url = 'http://223.130.134.181:8080';

export const submitSchoolApplication = async (applicationData: any): Promise<any> => {
    try {
        const response = await fetch(`${url}/basic/schools/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(applicationData)
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to submit school application:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error submitting school application:', error);
        throw error;
    }
};

export const fetchSchoolApplications = async (): Promise<any> => {
    try {
        const response = await fetch(`${url}/super/schools/applications`, {
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
            console.error('Failed to fetch school applications:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching school applications:', error);
        throw error;
    }
};


export const updateSchoolApplicationState = async (schoolApplicationId: number, state: number): Promise<any> => {
    try {
        const response = await fetch(`${url}/super/schools/applications/${schoolApplicationId}?state=${state}`, {
            method: 'PATCH',
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
            console.error('Failed to update school application state:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error updating school application state:', error);
        throw error;
    }
};

export const deleteSchoolApplication = async (schoolApplicationId: number): Promise<any> => {
    try {
        const response = await fetch(`${url}/super/schools/applications/${schoolApplicationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });


        if (response.ok) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        }


    } catch (error) {
        console.error('Error deleting school application:', error);
        throw error;
    }
};