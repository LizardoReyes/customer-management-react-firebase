import { type ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">{children}</h1>
    </div>
  );
}
