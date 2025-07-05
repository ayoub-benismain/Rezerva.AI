async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem("token");

  if (!options.headers) options.headers = {};
  options.headers["Authorization"] = `Bearer ${token}`;

  let response = await fetch(url, options);

  if (response.status === 401) {
    // Try refreshing token
    const refreshResponse = await fetch("http://localhost:3000/token/refresh", {
      method: "POST",
      credentials: "include", // send cookie with refresh token
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      localStorage.setItem("token", data.accessToken);

      // Retry original request with new token
      options.headers["Authorization"] = `Bearer ${data.accessToken}`;
      response = await fetch(url, options);
      return response;
    } else {
      // Refresh token invalid, log out user
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect to login
      return null;
    }
  }

  return response;
}
