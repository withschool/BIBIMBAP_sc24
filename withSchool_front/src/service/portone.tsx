const MY_SERVER_URL = 'https://api.portone.io'; // Replace with your actual server URL
const PROXY_URL = 'http://www.withschool.site:8080/'; // Proxy URL to handle CORS

export const getCardDetails = async (billingKey: string, storeId?: string) => {
    try {
        const url = new URL(`${MY_SERVER_URL}/billing-keys/${encodeURIComponent(billingKey)}`);
        if (storeId) {
            url.searchParams.append('storeId', encodeURIComponent(storeId));
        }

        const response = await fetch(PROXY_URL + url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `PortOne XP92JCAb6MCCERueryHOorZkxEKoGhh04YtVyJzyR5JWHdLkAwDd7NEowZ2eZ0n3AhO93kg35NZNTLuk` // Replace with your actual API secret
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch card details: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.methods && data.methods.length > 0 && data.methods[0].type === 'BillingKeyPaymentMethodCard') {
            return data.methods[0].card; // Return the card details
        } else {
            throw new Error('Card details not found in the response');
        }
    } catch (error) {
        console.error('Error fetching card details:', error);
        throw error;
    }
};