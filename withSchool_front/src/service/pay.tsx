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
                headers: { "Content-Type": "application/json" },
                body: issueResponse.billingKey // Send billingKey as a string
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
            }

            const responseText = await response.text();
            try {
                const data = JSON.parse(responseText);
                return data;
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
                console.error('Response text:', responseText);
                throw new Error('Failed to parse JSON response');
            }
        } else {
            throw new Error('issueResponse is undefined');
        }
    } catch (error) {
        console.error('Error issuing billing key:', error);
        throw error;
    }
};
