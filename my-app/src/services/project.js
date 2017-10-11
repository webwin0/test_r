export default {
  get: () => fetch('http://localhost:8081/poc/users/532reqfsczdfc/projects', {
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

  post: (name) => fetch('/poc/users/532reqfsczdfc/projects', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      name
    }
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