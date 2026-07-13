const BASE_URL = 'http://localhost:3000/api/v1';

/**
 * Core function to handle API requests.
 * 
 * @param {string} endpoint - The API endpoint (e.g., '/users')
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param {object} data - The payload for POST/PUT/PATCH requests
 * @param {function} onLoading - A callback function that receives true when loading starts, and false when it ends
 * @returns {object} - An object containing { success, data, error }
 */
async function apiRequest(endpoint, method = 'GET', data = null, onLoading = null) {
    // Trigger loading start
    if (typeof onLoading === 'function') {
        onLoading(true);
    }
    
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                withCredentials: true
            }
        };

        // Attach body for methods that require it
        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        
        // Parse the response
        let result;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
        } else {
            result = await response.text();
        }

        if (!response.ok) {
            throw new Error(result.message || result || 'Something went wrong');
        }

        return { success: "success", data: result };
    } catch (error) {
        console.error(`API Error on ${method} ${endpoint}:`, error);
        return { success: "error", error: error.message };
    } finally {
        if (typeof onLoading === 'function') {
            onLoading(false);
        }
    }
}

// Exportable API methods
export const api = {
    get: (endpoint, onLoading) => apiRequest(endpoint, 'GET', null, onLoading),
    post: (endpoint, data, onLoading) => apiRequest(endpoint, 'POST', data, onLoading),
    put: (endpoint, data, onLoading) => apiRequest(endpoint, 'PUT', data, onLoading),
    patch: (endpoint, data, onLoading) => apiRequest(endpoint, 'PATCH', data, onLoading),
    delete: (endpoint, onLoading) => apiRequest(endpoint, 'DELETE', null, onLoading)
};
