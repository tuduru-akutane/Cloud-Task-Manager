"use client";
import React from "react";

export default function RightMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <aside className={`fixed right-6 top-20 w-64 h-4/6 bg-slate-900/80 text-white rounded-xl shadow-lg backdrop-blur transition-transform ${open ? "translate-x-0" : "translate-x-[calc(100%+1.5rem)]"}`}>
      <div className="p-4 flex items-center justify-between">
        <h3 className="font-medium">Menu</h3>
        <button onClick={onClose} className="text-slate-300 hover:text-white">✕</button>
      </div>
      <div className="p-4 text-sm text-slate-300">
        <p>Appearance settings (placeholder)</p>
        <p className="mt-3">Account (placeholder)</p>
      </div>
    </aside>
  );
}
