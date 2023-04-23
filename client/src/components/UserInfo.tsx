import { User } from "@auth0/auth0-react";
import Card from "./Card";

export default function UserInfo(props: { user: User }) {
  return (
    <Card>
      <h2>User Info</h2>
      <p>sub: {props.user.sub}</p>
      <p>name: {props.user.name}</p>
      <p>email: {props.user.email}</p>
    </Card>
  );
}
