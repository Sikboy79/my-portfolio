"use client";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <div className="text-red-500">{children}</div>;
}