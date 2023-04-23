const VITE_API_ORIGIN = import.meta.env.VITE_API_ORIGIN;

export async function fetchPosts(token: string) {
  const res = await fetch(`${VITE_API_ORIGIN}/api/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("Error while fetching posts");
  }
  const data = await res.json();
  return data;
}

export async function fetchCreatePost(
  text: string,
  user: {
    sub: string;
    name?: string;
  },
  token: string
) {
  const res = await fetch(`${VITE_API_ORIGIN}/api/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text, user: user }),
  });
  if (!res.ok) {
    throw new Error("Error while creating post", { cause: res });
  }
}

export async function fetchDeletePost(id: string, token: string) {
  const res = await fetch(`${VITE_API_ORIGIN}/api/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("Error while deleting post");
  }
}
