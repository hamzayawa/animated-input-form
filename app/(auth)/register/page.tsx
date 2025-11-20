'use client';
import { useState } from 'react';
import FloatingInput from '@/components/FloatingInput';
import PasswordInput from '@/components/PasswordInput';


export default function RegisterPage() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const [errors, setErrors] = useState<Record<string, string | null>>({});


  const validate = () => {
    const e: Record<string, string | null> = {};
    e.firstname = firstname.trim().length >= 1 ? null : 'First Name is required.';
    e.lastname = lastname.trim().length >= 1 ? null : 'Last Name is required.';
    e.username = username.trim().length >= 3 ? null : 'Username must be at least 3 characters.';
    e.email = /\S+@\S+\.\S+/.test(email) ? null : 'Please enter a valid email address.';


    // password rules
    const pw = password.trim();
    if (pw.length < 8) e.password = 'Password must be at least 8 characters.';
    else if (!/[a-z]/.test(pw)) e.password = 'Password must contain at least one lowercase letter.';
    else if (!/[A-Z]/.test(pw)) e.password = 'Password must contain at least one uppercase letter.';
    else if (!/\d/.test(pw)) e.password = 'Password must contain at least one number.';
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pw)) e.password = 'Password must contain at least one special character.';
    else e.password = null;


    e.confirmPassword = confirmPassword === password ? null : 'Password and confirm password do not match.';


    setErrors(e);


    // return overall validity
    return Object.values(e).every((v) => v === null);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // For now: store a minimal user object in localStorage (demo only)
      const user = { firstname, lastname, username, email };
      try {
        const existing = JSON.parse(localStorage.getItem('users') || '[]');
        existing.push(user);
        localStorage.setItem('users', JSON.stringify(existing));
      } catch (err) {
        localStorage.setItem('users', JSON.stringify([user]));
      }
      alert('Registered (demo). Check localStorage -> users.');
      // reset
      setFirstname(''); setLastname(''); setUsername(''); setEmail(''); setPassword(''); setConfirmPassword('');
      setErrors({});
    }
  };


  return (
    <div className="auth-wrap">
      <div className="card">
        <h2 className="primary text-xl mb-2">Signup</h2>
        <p className="text-sm text-gray-500 mb-4">Create your account — quick and secure.</p>
        <form onSubmit={handleSubmit} noValidate>
          <FloatingInput id="firstname" label="First Name" value={firstname} onChange={setFirstname} error={errors.firstname} autoComplete="given-name" />
          <FloatingInput id="lastname" label="Last Name" value={lastname} onChange={setLastname} error={errors.lastname} autoComplete="family-name" />
          <FloatingInput id="username" label="Username" value={username} onChange={setUsername} error={errors.username} autoComplete="username" />
          <FloatingInput id="email" label="Email" value={email} onChange={setEmail} error={errors.email} autoComplete="email" type="email" />
          <PasswordInput id="password" label="Password" value={password} onChange={setPassword} error={errors.password} autoComplete="new-password" />
          <PasswordInput id="confirmPassword" label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} error={errors.confirmPassword} autoComplete="new-password" />


          <div className="mt-4 flex items-center justify-between">
            <button type="submit" className="button" disabled={!username || !password || !confirmPassword}>Signup</button>
            <a href="/auth/login" className="text-sm underline">Have an account? Log in</a>
          </div>
        </form>


        <div className="divider">OR</div>


        <div className="mt-3 text-sm text-gray-600">Or continue with social providers (demo buttons)</div>
      </div>
    </div>
  );
}
