export default {
  get: (id) => fetch(`http://localhost:8081/poc/users/${id}`, {
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
    })
}