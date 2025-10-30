export default async function sendRequest(url, method = 'GET', payload) {

	const options = { method };

	if (payload) {
		options.headers = { 'Content-Type': 'application/json' };
		options.body = JSON.stringify(payload);
	}

	try {
			const res = await fetch(`http://127.0.0.1:8000${url}`, options);
			if (!res.ok) return res;
			if (res.status === 204) return { ok: true };
			const contentType = res.headers.get('content-type') || '';
			if (contentType.includes('application/json')) return res.json();
			return { ok: true };
	} catch (err) {
		console.log(err, "error in send-request");
		return err;
	}
}