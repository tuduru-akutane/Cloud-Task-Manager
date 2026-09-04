"use client";
import React, { useState } from "react";
import TaskCard, { Task } from "./TaskCard";

export default function Column({
  title,
  status,
  tasks,
  onAdd,
  onDelete,
  onUpdateTitle,
  onMoveForward,
  onMoveBack,
}: {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onAdd: (title: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
  onUpdateTitle: (id: string, title: string) => void;
  onMoveForward: (id: string) => void;
  onMoveBack: (id: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [value, setValue] = useState("");

  function submit() {
    const v = value.trim();
    if (!v) return;
    onAdd(v, status);
    setValue("");
    setAdding(false);
  }

  return (
    <div className="flex-1 min-w-[220px] max-w-sm">
      <div className="bg-slate-800/60 text-white rounded-xl shadow-inner p-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{title}</h2>
          <div className="text-sm opacity-80">...</div>
        </div>
      </div>

      <div className="bg-slate-900/70 rounded-2xl p-4 min-h-[420px]">
        {tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onDelete={onDelete}
            onUpdateTitle={onUpdateTitle}
            onMoveForward={onMoveForward}
            onMoveBack={onMoveBack}
          />
        ))}

        {adding ? (
          <div className="mt-2">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
                if (e.key === "Escape") setAdding(false);
              }}
              className="w-full px-2 py-2 rounded text-slate-900"
              placeholder="Title"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={submit} className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
              <button onClick={() => setAdding(false)} className="px-3 py-1 bg-slate-600 text-white rounded">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAdding(true)} className="mt-4 w-full bg-slate-700/60 text-white rounded px-3 py-2 flex items-center gap-2">
            <span className="font-semibold">+ Add card</span>
          </button>
        )}
      </div>
    </div>
  );
}
