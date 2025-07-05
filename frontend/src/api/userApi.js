import { fetchWithAuth } from "../utils/fetchWithAuth";

export async function getUserData() {
  const response = await fetchWithAuth("http://localhost:3000/api/user");
  if (response && response.ok) {
    return await response.json();
  }
  throw new Error("Failed to fetch user data");
}
