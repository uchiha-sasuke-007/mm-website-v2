import type { ComponentProps } from "react";

type InternalLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
};

export default function InternalLink({ children, href, ...props }: InternalLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}
