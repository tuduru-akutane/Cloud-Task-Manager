"use client";
import React, { useState } from "react";

export type Task = {
  id: string;
  title: string;
  status: "plan" | "do" | "complete";
};

export default function TaskCard({
  task,
  onDelete,
  onUpdateTitle,
  onMoveForward,
  onMoveBack,
}: {
  task: Task;
  onDelete: (id: string) => void;
  onUpdateTitle: (id: string, title: string) => void;
  onMoveForward: (id: string) => void;
  onMoveBack: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  function save() {
    const trimmed = value.trim();
    if (trimmed === "") return;
    onUpdateTitle(task.id, trimmed);
    setEditing(false);
  }

  return (
    <div className="bg-white/90 text-slate-900 rounded-md shadow-md p-3 mb-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          {editing ? (
            <div className="flex gap-2">
              <input
                className="w-full rounded px-2 py-1 border"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") save();
                }}
              />
              <button onClick={save} className="bg-slate-800 text-white px-2 rounded">Save</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm">{task.title}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-1">
            <button
              title="Edit"
              onClick={() => setEditing((s) => !s)}
              className="p-1 rounded hover:bg-slate-100"
            >
              ✎
            </button>
            <button
              title="Delete"
              onClick={() => onDelete(task.id)}
              className="p-1 rounded hover:bg-red-100 text-red-600"
            >
              🗑
            </button>
          </div>
          <div className="flex gap-1 text-xs">
            <button
              onClick={() => onMoveBack(task.id)}
              disabled={task.status === "plan"}
              className={`px-2 py-1 rounded ${task.status === "plan" ? "opacity-40 cursor-not-allowed" : "bg-slate-200"}`}
            >
              ←
            </button>
            <button
              onClick={() => onMoveForward(task.id)}
              disabled={task.status === "complete"}
              className={`px-2 py-1 rounded ${task.status === "complete" ? "opacity-40 cursor-not-allowed" : "bg-slate-200"}`}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
