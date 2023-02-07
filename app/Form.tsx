'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function FormPost() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  //Create a submit post
  async function submitPost(e: React.FormEvent) {
    e.preventDefault();
    const data = await fetch(`/api/createPost`, {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
    const res = await data.json();
    router.refresh();
    if (!res.ok) console.log(res.message);
    setTitle('');
  }

  return (
    <form
      onSubmit={submitPost}
      className="flex"
    >
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="py-1 px-2 rounded-sm basis-1/2"
      />
      <button
        type="submit"
        className="py-1 px-6 bg-teal-600 rounded-md ml-4 basis-1/2"
      >
        Make a new post
      </button>
    </form>
  );
}
