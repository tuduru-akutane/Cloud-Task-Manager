"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Column from "../components/Column";
import RightMenu from "../components/RightMenu";
import AuthForm from "../components/AuthForm";
import { AuthProvider, useAuth } from "../lib/auth";
import type { Task } from "../components/TaskCard";

const STORAGE_KEY = "cloud-task-manager.tasks.v1";

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>(() => []);
  // const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  // function addTask(title: string, status: Task["status"]) {
  //   const t: Task = { id: makeId(), title, status };
  //   setTasks((s) => [t, ...s]);
  // }

  // function deleteTask(id: string) {
  //   setTasks((s) => s.filter((t) => t.id !== id));
  // }

  // function updateTitle(id: string, title: string) {
  //   setTasks((s) => s.map((t) => (t.id === id ? { ...t, title } : t)));
  // }

  // function moveForward(id: string) {
  //   setTasks((s) =>
  //     s.map((t) => {
  //       if (t.id !== id) return t;
  //       if (t.status === "plan") return { ...t, status: "do" };
  //       if (t.status === "do") return { ...t, status: "complete" };
  //       return t;
  //     })
  //   );
  // }

  // function moveBack(id: string) {
  //   setTasks((s) =>
  //     s.map((t) => {
  //       if (t.id !== id) return t;
  //       if (t.status === "complete") return { ...t, status: "do" };
  //       if (t.status === "do") return { ...t, status: "plan" };
  //       return t;
  //     })
  //   );
  // }

  // const plan = tasks.filter((t) => t.status === "plan");
  // const doing = tasks.filter((t) => t.status === "do");
  // const complete = tasks.filter((t) => t.status === "complete");

  return (
    <AuthWrapper>
      <InnerApp />
    </AuthWrapper>
  );
}

function InnerApp() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  function addTask(title: string, status: Task["status"]) {
    const t: Task = { id: makeId(), title, status };
    setTasks((s) => [t, ...s]);
  }

  function deleteTask(id: string) {
    setTasks((s) => s.filter((t) => t.id !== id));
  }

  function updateTitle(id: string, title: string) {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, title } : t)));
  }

  function moveForward(id: string) {
    setTasks((s) =>
      s.map((t) => {
        if (t.id !== id) return t;
        if (t.status === "plan") return { ...t, status: "do" };
        if (t.status === "do") return { ...t, status: "complete" };
        return t;
      })
    );
  }

  function moveBack(id: string) {
    setTasks((s) =>
      s.map((t) => {
        if (t.id !== id) return t;
        if (t.status === "complete") return { ...t, status: "do" };
        if (t.status === "do") return { ...t, status: "plan" };
        return t;
      })
    );
  }

  const plan = tasks.filter((t) => t.status === "plan");
  const doing = tasks.filter((t) => t.status === "do");
  const complete = tasks.filter((t) => t.status === "complete");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 text-white">
      <HeaderWithAuth onOpenMenu={() => setMenuOpen(true)} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-slate-700/40 rounded-xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex gap-6">
            <Column
              title="Plan"
              status="plan"
              tasks={plan}
              onAdd={addTask}
              onDelete={deleteTask}
              onUpdateTitle={updateTitle}
              onMoveForward={moveForward}
              onMoveBack={moveBack}
            />
            <Column
              title="Do"
              status="do"
              tasks={doing}
              onAdd={addTask}
              onDelete={deleteTask}
              onUpdateTitle={updateTitle}
              onMoveForward={moveForward}
              onMoveBack={moveBack}
            />
            <Column
              title="Complete"
              status="complete"
              tasks={complete}
              onAdd={addTask}
              onDelete={deleteTask}
              onUpdateTitle={updateTitle}
              onMoveForward={moveForward}
              onMoveBack={moveBack}
            />
          </div>
        </div>
      </main>

      <RightMenu open={menuOpen} onClose={() => setMenuOpen(false)}/>

      <footer className="text-center text-slate-300 py-6">Built with Next.js + Tailwind</footer>
    </div>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AuthForm />
      </div>
    );
  return <>{children}</>;
}

function HeaderWithAuth({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { user, signOut } = useAuth();
  return <Header onOpenMenu={onOpenMenu} user={user ? { email: user.email || undefined } : null} onSignOut={() => signOut()} />;
}
