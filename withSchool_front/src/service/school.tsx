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

//215a0c0d1fd74b64946efdc0ef79bc04
export const getSchoolListFromNeis = async (search: string): Promise<any> => {
    const proxyUrl = 'http://www.withschool.site:8080/';
    const apiUrl = `https://open.neis.go.kr/hub/schoolInfo?KEY=215a0c0d1fd74b64946efdc0ef79bc04&Type=json&pIndex=1&pSize=100&SCHUL_NM=${search}`;

    try {
        const response = await fetch(proxyUrl + apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.schoolInfo && data.schoolInfo[1] && data.schoolInfo[1].row) {
                return data.schoolInfo[1].row.map((item: any) => ({
                    schoolName: item.SCHUL_NM,
                    schoolPhoneNumber: item.ORG_TELNO,
                    schoolAddress: item.ORG_RDNMA,
                    sd_SCHUL_CODE: item.SD_SCHUL_CODE, // Include sd_SCHUL_CODE
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

export const getSchoolNotice = async (targetStudent: string | null): Promise<any> => {
    try {
        const response = await fetch(`${url}/schools/notices?childId=${targetStudent}`, {
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
export const registerSchool = async (schoolData: any): Promise<any> => {
    console.log(schoolData);
    try {
        const response = await fetch(`${url}/super/schools`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                schoolInformationNoPaymentStateDTO: {
                    ATPT_OFCDC_SC_CODE: schoolData.ATPT_OFCDC_SC_CODE,
                    ATPT_OFCDC_SC_NM: schoolData.ATPT_OFCDC_SC_NM,
                    SD_SCHUL_CODE: schoolData.SD_SCHUL_CODE,
                    SCHUL_NM: schoolData.SCHUL_NM,
                    ENG_SCHUL_NM: schoolData.ENG_SCHUL_NM,
                    SCHUL_KND_SC_NM: schoolData.SCHUL_KND_SC_NM,
                    LCTN_SC_NM: schoolData.LCTN_SC_NM,
                    JU_ORG_NM: schoolData.JU_ORG_NM,
                    FOND_SC_NM: schoolData.FOND_SC_NM,
                    ORG_RDNZC: schoolData.ORG_RDNZC,
                    ORG_RDNMA: schoolData.ORG_RDNMA,
                    ORG_RDNDA: schoolData.ORG_RDNDA,
                    ORG_TELNO: schoolData.ORG_TELNO,
                    HMPG_ADRES: schoolData.HMPG_ADRES,
                    COEDU_SC_NM: schoolData.COEDU_SC_NM,
                    ORG_FAXNO: schoolData.ORG_FAXNO,
                    HS_SC_NM: schoolData.HS_SC_NM,
                    INDST_SPECL_CCCCL_EXST_YN: schoolData.INDST_SPECL_CCCCL_EXST_YN,
                    HS_GNRL_BUSNS_SC_NM: schoolData.HS_GNRL_BUSNS_SC_NM,
                    SPCLY_PURPS_HS_ORD_NM: schoolData.SPCLY_PURPS_HS_ORD_NM,
                    ENE_BFE_SEHF_SC_NM: schoolData.ENE_BFE_SEHF_SC_NM,
                    DGHT_SC_NM: schoolData.DGHT_SC_NM,
                    FOND_YMD: schoolData.FOND_YMD,
                    FOAS_MEMRD: schoolData.FOAS_MEMRD,
                    LOAD_DTM: schoolData.LOAD_DTM,
                },
                adminEmail: schoolData.adminEmail
            })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to register school:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error registering school:', error);
        throw error;
    }
};

export const deleteSchool = async (schoolId: number): Promise<any> => {
    try {
        const response = await fetch(`${url}/super/schools/${schoolId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to delete school:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error deleting school:', error);
        throw error;
    }
};

export const getSchoolInfo = async (childId: string | null): Promise<any> => {
    try {
        const response = await fetch(`${url}/schools/info?childId=${childId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to get school information:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error deleting school information:', error);
        throw error;
    }
};
export const getClassNotices = async (childId: number): Promise<any> => {
    try {
        const response = await fetch(`${url}/classes/notices?childId=${childId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('공지 리스트 조회 완료:', data);
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('공지 리스트 조회 실패:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (errorss) {
        console.error('공지 리스트 조회 실패:', errorss);
    }
};

export const updateSchoolPaymentState = async (schoolId: number, paymentState: number): Promise<any> => {
    try {
        const response = await fetch(`${url}/super/schools/payment-state`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                schoolId,
                paymentState
            })
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to update school payment state:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error updating school payment state:', error);
        throw error;
    }
};