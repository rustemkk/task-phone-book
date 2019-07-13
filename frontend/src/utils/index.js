const backendUrl = 'http://localhost:3000/api';

export const callAPI = (method, path, body = {}) => {
  if (path === '/contacts/importFile') {
    return fetch(`${backendUrl}${path}`, {
      method: 'POST',
      body: body
    });
  }

  // console.log(1, method, path, body);
  // console.log(2, `${backendUrl}${path}`);
  // console.log(3, {
  //   method,
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: method === 'POST' ? JSON.stringify(body) : undefined
  // });

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