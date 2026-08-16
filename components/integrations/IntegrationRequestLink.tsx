import type { ReactNode } from "react";
import Link from "next/link";

type IntegrationRequestLinkProps = {
  slug: string;
  className?: string;
  children?: ReactNode;
};

export default function IntegrationRequestLink({
  slug,
  className,
  children = "Solicită integrarea",
}: IntegrationRequestLinkProps) {
  return (
    <Link href={`/contact?integrare=${encodeURIComponent(slug)}`} className={className}>
      {children}
    </Link>
  );
}
