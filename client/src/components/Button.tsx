import "./Button.css";
import { ReactNode } from "react";
import "./Button.css";

export default function Button(props: {
  type?: "button" | "submit";
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button className="Button" onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
}
