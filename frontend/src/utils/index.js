const backendUrl = 'http://localhost:3000/api';

export const callAPI = (method, path, body = {}) => {
  if (path === '/contacts/importFile') {
    return fetch(`${backendUrl}${path}`, {
      method: 'POST',
      body: body
    });
  }

  return fetch(`${backendUrl}${path}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: ['POST', 'PUT'].includes(method) ? JSON.stringify(body) : undefined
  })
    .then(res => res.json());
}

export const downloadURI = (path, name) => {
  let link = document.createElement('a');
  link.href = `${backendUrl}${path}`;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};