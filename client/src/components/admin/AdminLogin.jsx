import React, { useState } from 'react';
import { ShieldCheck, LockKeyhole } from 'lucide-react';
import { adminLogin } from '../../services/api';

export default function AdminLogin({ onLoginSuccess }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminLogin(passcode);
      localStorage.setItem('adminToken', response.data.token);
      onLoginSuccess();
    } catch (err) {
      setError('Invalid passcode. Please try again.');
      setPasscode('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#111527]/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md rounded-3xl bg-white border border-[#e4e8f2] shadow-[0_24px_50px_rgba(17,21,39,0.22)] p-5 md:p-7">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-[#ffe8ee] text-[#f84464] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl text-[#1d2237]">Admin Access</h2>
            <p className="text-sm text-[#6b7287]">Enter your 6-digit security passcode.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="passcode" className="text-sm font-medium text-[#47506a] block mb-1.5">
              Passcode
            </label>
            <div className="relative">
              <LockKeyhole className="w-4 h-4 text-[#8e96ab] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(event) => setPasscode(event.target.value.slice(0, 6))}
                placeholder="Enter 6 digits"
                inputMode="numeric"
                maxLength={6}
                autoComplete="current-password"
                className="w-full rounded-xl border border-[#dfe4ef] bg-white pl-10 pr-3 py-2.5 text-[#1d2237] tracking-[0.2em] text-center font-semibold focus:outline-none focus:ring-2 focus:ring-[#f2a9b7]"
                disabled={loading}
              />
            </div>
            {error && <p className="text-xs text-[#d92f5b] mt-1.5">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || passcode.length !== 6}
            className="w-full rounded-xl bg-[#f84464] hover:bg-[#db3053] text-white font-bold py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Continue'}
          </button>
        </form>

        <p className="text-xs text-[#6b7287] mt-4">
          Access is restricted to authorized administrators only.
        </p>
      </div>
    </div>
  );
}
