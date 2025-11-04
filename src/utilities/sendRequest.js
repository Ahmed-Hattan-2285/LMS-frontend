export default async function sendRequest(url, method = 'GET', payload) {
    const token = localStorage.getItem('token');

	const options = { method };
	if (payload) {
		options.headers = { 'Content-Type': 'application/json' };
		options.body = JSON.stringify(payload);
	}

    if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }

	try {
		const res = await fetch(`http://127.0.0.1:8000${url}`, options);
		
		if (res.status === 204) {
			return null;
		}
		
		const text = await res.text();
		
		if (res.ok) {
			if (!text) {
				return null;
			}
			
			try {
				return JSON.parse(text);
			} catch (parseErr) {
				return text || null;
			}
		}
		
		let errorData;
		try {
			errorData = text ? JSON.parse(text) : { error: res.statusText };
		} catch (parseErr) {
			errorData = { error: res.statusText || 'Request failed' };
		}
		
		const error = new Error(errorData.error || res.statusText || 'Request failed');
		error.status = res.status;
		error.data = errorData;
		throw error;
	} catch (err) {
		console.log(err);
		if (err.status !== undefined) {
			throw err;
		}
		throw new Error(err.message || 'Request failed');
	}
}