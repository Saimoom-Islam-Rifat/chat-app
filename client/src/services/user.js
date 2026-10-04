export async function searchUsers(query) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/users/search?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.users;
}
