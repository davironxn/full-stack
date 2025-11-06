"use client";

import { signOut } from "next-auth/react";
import { ButtonHTMLAttributes } from "react";

type SignOutButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function SignOutButton({ children = "Sign out", ...props }: SignOutButtonProps) {
  return (
    <button
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          void signOut();
        }
      }}
    >
      {children}
    </button>
  );
}
