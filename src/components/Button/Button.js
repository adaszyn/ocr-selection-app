import './Button.css'
import * as React from "react";
export const Button = props => <button className="Button" {...props}>{props.children}</button>