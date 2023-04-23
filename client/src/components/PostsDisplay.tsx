import { User } from "@auth0/auth0-react";
import { Post } from "../types";
import Button from "./Button";
import Card from "./Card";
import "./PostsDisplay.css";

export default function PostsDisplay(props: {
  posts: Array<Post>;
  user: User;
  onLoadPosts: () => void;
  onDeletePost: (id: string) => void;
  error?: string;
}) {
  return (
    <div>
      <h2>Posts</h2>
      <div>
        <Button onClick={props.onLoadPosts}>load posts</Button>
      </div>
      <div>
        {props.posts.map((post) => (
          <Card key={post.id}>
            <div className="PostsDisplay__Post">
              <div>
                <div>
                  <small>user: {post.user.sub}</small>
                </div>
                <div>{post.text}</div>
              </div>
              {props.user.sub === post.user.sub ? (
                <div>
                  <Button onClick={() => props.onDeletePost(post.id)}>
                    delete
                  </Button>
                </div>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
      {props.error ? <div>{props.error}</div> : null}
    </div>
  );
}
