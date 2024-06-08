import * as PortOne from "@portone/browser-sdk/v2";

const MY_SERVER_URL = 'http://your-server-url.com'; // Replace with your actual server URL
const PROXY_URL = 'http://www.withschool.site:8080/'; // Replace with your actual proxy URL

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

            const response = await fetch(`${PROXY_URL}${MY_SERVER_URL}/billings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    billingKey: issueResponse.billingKey
                })
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } else {
            throw new Error('issueResponse is undefined');
        }
    } catch (error) {
        console.error('Error issuing billing key:', error);
        throw error;
    }
};