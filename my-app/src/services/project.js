export default {
  get: (userId) => fetch(`http://localhost:8081/poc/users/${userId}/projects`, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }),

  post: (userId, name) => fetch(`http://localhost:8081/poc/users/${userId}/projects`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }),

  patch: (userId, projectId, data) => fetch(`http://localhost:8081/poc/users/${userId}/projects/${projectId}`, {
    method: 'patch',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
}