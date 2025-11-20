"use client";
import { useState } from "react";
import FloatingInput from "@/components/FloatingInput";
import PasswordInput from "@/components/PasswordInput";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login: check localStorage users by username
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const found = users.find((u: any) => u.username === username);
      if (!found) {
        setError("User not found (demo). Register first.");
        return;
      }
      // No password check in demo
      alert("Logged in (demo).");
      setError(null);
      setUsername("");
      setPassword("");
    } catch (err) {
      setError("Storage error (demo).");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="card">
        <h2 className="primary text-xl mb-2">Login</h2>
        <p className="text-sm text-gray-500 mb-4">
          Welcome back — please sign in.
        </p>
        <form onSubmit={handleLogin} noValidate>
          <FloatingInput
            id="username"
            label="Username"
            value={username}
            onChange={setUsername}
            error={null}
            autoComplete="username"
          />
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={setPassword}
            error={null}
            autoComplete="current-password"
          />

          {error ? <div className="feedback text-red-600">{error}</div> : null}

          <div className="mt-4 flex items-center justify-between">
            <button
              type="submit"
              className="button"
              disabled={!username || !password}
            >
              Login
            </button>
            <a href="/auth/register" className="text-sm underline">
              Don't have an account? Signup
            </a>
          </div>
        </form>

        <div className="divider">OR</div>

        <div className="mt-3 text-sm text-gray-600">
          Continue with: (demo) Google / GitHub
        </div>
      </div>
    </div>
  );
}
