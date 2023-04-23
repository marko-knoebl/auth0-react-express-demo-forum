import { useState } from "react";
import Button from "./Button";
import "./NewPostForm.css";

export default function NewPostForm(props: {
  onCreatePost: (text: string) => void;
}) {
  const [postText, setPostText] = useState("");

  function createPost() {
    props.onCreatePost(postText);
    setPostText("");
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        createPost();
      }}
    >
      <textarea
        value={postText}
        onChange={(event) => setPostText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault();
            createPost();
          }
        }}
        className="NewPostForm__Textarea"
      />
      <Button type="submit">send</Button>
    </form>
  );
}
