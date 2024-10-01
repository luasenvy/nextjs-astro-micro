import classnames from "classnames";
import NextLink from "next/link";

import { twMerge } from "tailwind-merge";

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  underline?: boolean;
  group?: boolean;
}

export default function Link({
  href,
  external,
  underline = true,
  group = false,
  children,
  ...props
}: LinkProps) {
  return (
    <NextLink
      href={href}
      target={external ? "_blank" : undefined}
      className={twMerge(
        classnames(
          "inline-block decoration-black/30 dark:decoration-white/30 hover:decoration-black/50 focus-visible:decoration-black/50 dark:hover:decoration-white/50 dark:focus-visible:decoration-white/50 text-current hover:text-black focus-visible:text-black dark:hover:text-white dark:focus-visible:text-white transition-colors duration-300 ease-in-out",
          { group, "underline underline-offset-[3px]": underline }
        )
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
