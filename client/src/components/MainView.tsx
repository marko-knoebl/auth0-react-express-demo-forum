import { useAuth0 } from "@auth0/auth0-react";
import UserInfo from "./UserInfo";
import NewPostForm from "./NewPostForm";
import { useEffect, useState } from "react";
import { Post } from "../types";
import PostsDisplay from "./PostsDisplay";
import { fetchCreatePost, fetchDeletePost, fetchPosts } from "../api";
import Card from "./Card";

/**
 * Main component
 * handles post data
 */
export default function MainView() {
  const { user, getAccessTokenSilently } = useAuth0();
  if (!user) {
    throw new Error("Unexpected state: could not get user");
  }

  const [posts, setPosts] = useState<Array<Post>>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  async function loadPosts() {
    try {
      const token = await getAccessTokenSilently();
      const data = await fetchPosts(token);
      setPosts(data);
    } catch (e) {
      setPosts([]);
      setErrorMessage("Could not load posts");
    }
  }

  async function deletePost(id: string) {
    try {
      const token = await getAccessTokenSilently();
      await fetchDeletePost(id, token);
      await loadPosts();
    } catch (e) {
      setErrorMessage("Could not delete post");
    }
  }

  async function createPost(postText: string) {
    const token = await getAccessTokenSilently();
    if (user === undefined || user.sub === undefined) {
      throw new Error("user is undefined");
    }
    try {
      await fetchCreatePost(postText, user as { sub: string }, token);
    } catch (e) {
      setErrorMessage("Could not create post");
      return;
    }
    await loadPosts();
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <UserInfo user={user} />
      <Card>
        <PostsDisplay
          posts={posts}
          user={user}
          onLoadPosts={loadPosts}
          onDeletePost={deletePost}
          error={errorMessage}
        />
        <NewPostForm onCreatePost={createPost} />
      </Card>
    </div>
  );
}
