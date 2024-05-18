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

const neisApiUrl = 'https://open.neis.go.kr/hub/schoolInfo';

export const getSchoolListFromNeis = async (searchTerm: string): Promise<NeisSchool[]> => {
    try {
        const response = await fetch(`${neisApiUrl}?KEY=215a0c0d1fd74b64946efdc0ef79bc04&Type=json&pIndex=1&pSize=100&SCHUL_NM=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data.schoolInfo[1].row; // Adjust this based on the actual structure of the response
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch school list from NEIS:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching school list from NEIS:', error);
        throw error;
    }
}