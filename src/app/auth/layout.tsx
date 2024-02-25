export default function AuthoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-[350px] px-5">{children}</div>
    </div>
  );
}
