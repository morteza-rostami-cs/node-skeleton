// fetch this from api -- before any other request
let apiBaseUrl = "/api"; // browser auto resolve to current origin (same origin)

async function request(url, options = {}) {
  // make request
  const response = await fetch(apiBaseUrl + url, options);

  // check response
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  // response has no body -- eg: delete a resource
  if (response.status === 204) {
    return null;
  }

  return response.json(); // return json data
}

export function get(url) {
  return request(url);
}

export function post(url, data) {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function put(url, data) {
  return request(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function del(url) {
  return request(url, {
    method: "DELETE",
  });
}
