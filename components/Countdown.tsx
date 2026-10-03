"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

function remaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    Days: Math.floor(diff / 86400000),
    Hours: Math.floor((diff / 3600000) % 24),
    Minutes: Math.floor((diff / 60000) % 60),
    Seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  // Start empty so server and client render the same markup, then tick on the client.
  const [time, setTime] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    setTime(remaining(target));
    const id = setInterval(() => setTime(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = ["Days", "Hours", "Minutes", "Seconds"] as const;

  return (
    <div className="countdown" aria-live="off">
      {units.map((u) => (
        <div key={u}>
          <span>{time ? pad(time[u]) : "--"}</span>
          <small>{u}</small>
        </div>
      ))}
    </div>
  );
}
