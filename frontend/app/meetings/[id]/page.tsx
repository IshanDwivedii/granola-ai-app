"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function MeetingDetail() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadMeeting = async () => {
    const res = await api.get(`/meetings/${id}`);
    setMeeting(res.data);
  };

  const summarize = async () => {
    setLoading(true);
    const res = await api.post(`/meetings/${id}/summarize`);
    setMeeting({ ...meeting, summary: res.data.summary });
    setLoading(false);
  };

  useEffect(() => {
    loadMeeting();
  }, [id]);

  if (!meeting) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      
      <Link
        href="/"
        className="inline-block bg-gray-200 hover:bg-gray-300 text-black px-3 py-2 rounded-lg"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mt-4">{meeting.title}</h1>

      <button
        onClick={summarize}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Summarizing…" : "Generate Summary"}
      </button>

      {meeting.summary && (
        <div className="border p-4 rounded-lg bg-white text-black">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <pre className="whitespace-pre-wrap">{meeting.summary}</pre>
        </div>
      )}

      <div className="border p-4 rounded-lg bg-white text-black">
        <h2 className="text-xl font-semibold mb-2">Full Transcript</h2>
        <pre className="whitespace-pre-wrap">{meeting.raw_text}</pre>
      </div>

    </div>
  );
}
