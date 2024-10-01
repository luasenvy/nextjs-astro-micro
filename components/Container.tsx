export default function Container({ children }: React.PropsWithChildren) {
  return <div className="mx-auto max-w-screen-sm px-3">{children}</div>;
}
