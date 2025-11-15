"use client";

import { useState } from "react";
import { api } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function CreateMeeting() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const router = useRouter();

  const createMeeting = async () => {
    await api.post("/meetings", null, {
      params: { title, raw_text: text },
    });

    router.push("/"); // Redirect to dashboard
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Meeting</h1>

      <input
        className="border p-3 w-full rounded-lg"
        placeholder="Meeting Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-3 w-full rounded-lg h-40"
        placeholder="Paste meeting transcript here…"
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={createMeeting}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Save Meeting
      </button>
    </div>
  );
}
