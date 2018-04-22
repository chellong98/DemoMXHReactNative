export default class Http {
    get(url, headers) {
        return fetch(url, {
            method: 'GET',
            headers: headers
        })
    }

    post(url, headers, body) {
        return fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
        })
    }

    put(url, headers, body) {
        return fetch(url, {
            method: 'PUT',
            headers: headers,
            body: body,
        })
    }

    delete(url, headers, body) {
        return fetch(url, {
            method: 'DELETE',
            headers: headers,
            body: body,
        })
    }
}