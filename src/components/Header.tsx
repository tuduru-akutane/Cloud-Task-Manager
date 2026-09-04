"use client";
import React from "react";

export default function Header({ onOpenMenu, user, onSignOut }: { onOpenMenu: () => void; user?: { email?: string } | null; onSignOut?: () => void }) {
  return (
    <header className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Cloud Task Manager</h1>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm opacity-90">{user.email}</div>
              <button onClick={onSignOut} className="px-3 py-1 rounded bg-slate-700/30 hover:bg-slate-700/50 text-sm">Logout</button>
            </div>
          ) : null}

          <button
            aria-label="open-menu"
            onClick={onOpenMenu}
            className="w-9 h-9 rounded-full bg-slate-700/30 flex items-center justify-center hover:bg-slate-700/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
