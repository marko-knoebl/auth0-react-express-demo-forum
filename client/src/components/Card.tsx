import { ReactNode } from "react";
import "./Card.css";

export default function Card(props: { children: ReactNode }) {
  return <div className="Card">{props.children}</div>;
}
