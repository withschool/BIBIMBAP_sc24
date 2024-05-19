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


export const getSchoolListFromNeis = async (search: string): Promise<any> => {
    try {
        const response = await fetch(`/hub/schoolInfo?KEY=215a0c0d1fd74b64946efdc0ef79bc04&Type=json&SCHUL_NM=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const contentType = response.headers.get('content-type');
        if (response.ok && contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('API 응답 데이터:', data);
            if (data.schoolInfo && data.schoolInfo[1] && data.schoolInfo[1].row) {
                return data.schoolInfo[1].row.map((item: any) => ({
                    schoolName: item.SCHUL_NM,
                    schoolPhoneNumber: item.ORG_TELNO,
                    schoolAddress: item.ORG_RDNMA,
                    educationOffice: item.ATPT_OFCDC_SC_NM,
                    ...item
                }));
            } else {
                console.error('Unexpected API response structure:', data);
                throw new Error('Unexpected API response structure');
            }
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

export const getSchoolNotice = async (): Promise<any> => {
    try {
        const response = await fetch(`${url}/schools/notices`, {
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

export const getSchoolNoticeDetail = async (noticeId: number): Promise<any> => {
    try {
        const response = await fetch(`${url}/schools/notices/${noticeId}`, {
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