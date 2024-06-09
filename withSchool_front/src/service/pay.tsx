import * as PortOne from "@portone/browser-sdk/v2";

const MY_SERVER_URL = 'http://223.130.134.181:8080'; // Replace with your actual server URL
export const issueBillingKey = async () => {
    try {
        const issueResponse = await PortOne.requestIssueBillingKey({
            storeId: "store-b2c528ec-59c4-420b-8e47-5aac076f4573",
            channelKey: "channel-key-83a0c173-94f3-4f68-b34d-082cba990c84",
            billingKeyMethod: "CARD"
        });

        if (issueResponse && issueResponse.code != null) {
            alert(issueResponse.message);
            return;
        }

        if (issueResponse) {
            console.log(`Billing Key: ${issueResponse.billingKey}`);

            const schoolId = localStorage.getItem('schoolId');
            if (!schoolId) {
                throw new Error('schoolId is not found in localStorage');
            }
            console.log(`스쿨아디 : ${schoolId}`);
            const response = await fetch(`${MY_SERVER_URL}/admin/schools/${schoolId}/billingKey`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}` // Add Authorization header
                },
                body: JSON.stringify({ billingKey: issueResponse.billingKey }) // Send billingKey as JSON
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
            }

            const responseText = await response.text();
            if (responseText) {
                try {
                    const data = JSON.parse(responseText);
                    return data;
                } catch (jsonError) {
                    console.error('Error parsing JSON:', jsonError);
                    console.error('Response text:', responseText);
                    throw new Error('Failed to parse JSON response');
                }
            } else {
                console.warn('Empty response text');
                return null;
            }
        } else {
            throw new Error('issueResponse is undefined');
        }
    } catch (error) {
        console.error('Error issuing billing key:', error);
        throw error;
    }
};

export const checkBillingKey = async (schoolId: number): Promise<string | null> => {
    try {
        const response = await fetch(`${MY_SERVER_URL}/admin/schools/${schoolId}/billingKey`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to check billing key: ${response.status} ${response.statusText}`);
        }

        const data = await response.text();
        return data; // Assuming the API returns the billing key as a string or null
    } catch (error) {
        console.error('Error checking billing key:', error);
        throw error;
    }
};

export const registerFirstPlan = async (schoolId: number, plan: number): Promise<void> => {
    try {
        const response = await fetch(`${MY_SERVER_URL}/admin/schools/${schoolId}/subscriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ plan })
        });
        if (!response.ok) {
            throw new Error('Failed to register first plan');
        }
    } catch (error) {
        console.error('Error registering first plan:', error);
        throw error;
    }
};

export const changePlan = async (schoolId: number, plan: number): Promise<void> => {
    try {
        const response = await fetch(`${MY_SERVER_URL}/admin/schools/${schoolId}/subscriptions/change`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ plan })
        });
        if (!response.ok) {
            throw new Error('Failed to change plan');
        }
    } catch (error) {
        console.error('Error changing plan:', error);
        throw error;
    }
};

export const fetchInvoices = async (schoolId: number) => {
    try {
        const response = await fetch(`${MY_SERVER_URL}/admin/schools/${schoolId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch invoices: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching invoices:', error);
        throw error;
    }
};