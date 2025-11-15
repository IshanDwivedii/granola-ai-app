"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../lib/api";

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    api.get("/meetings").then((res) => setMeetings(res.data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meetings</h1>

      <Link
        href="/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        Create Meeting
      </Link>

      <div className="space-y-3">
        {meetings.map((m: any) => (
          <Link
            key={m.id}
            href={`/meetings/${m.id}`}
            className="block p-4 border rounded hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold">{m.title}</h2>
            <p className="text-sm text-gray-600">
              {m.summary ? m.summary.slice(0, 70) + "..." : "No summary yet"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
