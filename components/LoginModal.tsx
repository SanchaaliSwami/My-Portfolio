
import React, { useState, useEffect } from 'react';

export type LoginMode = 'LOGIN' | 'SET_INITIAL' | 'CHANGE_PASSWORD';

interface LoginModalProps {
  isOpen: boolean;
  mode: LoginMode;
  onClose: () => void;
  onSubmit: (password: string, newPassword?: string) => boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, mode, onClose, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'SET_INITIAL') {
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      onSubmit(password);
    } else if (mode === 'CHANGE_PASSWORD') {
      if (newPassword.length < 6) {
        setError('New password must be at least 6 characters.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match.');
        return;
      }
      const success = onSubmit(password, newPassword);
      if (!success) setError('Current password incorrect.');
    } else {
      const success = onSubmit(password);
      if (!success) setError('Authentication Failed.');
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'SET_INITIAL': return 'Initialize Admin';
      case 'CHANGE_PASSWORD': return 'Update Password';
      default: return 'Admin Entry';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'SET_INITIAL': return 'Set your secure workspace key';
      case 'CHANGE_PASSWORD': return 'Revise your access credentials';
      default: return 'Restricted Access';
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md p-10 md:p-16 rounded-sm shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-light serif mb-2">{getTitle()}</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">{getSubtitle()}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`border-b ${error && mode === 'LOGIN' ? 'border-red-500' : 'border-gray-200'} focus-within:border-black transition-colors pb-3`}>
            <input 
              type="password" 
              placeholder={mode === 'CHANGE_PASSWORD' ? "CURRENT PASSWORD" : "PASSWORD"}
              autoFocus
              className="w-full bg-transparent outline-none text-[11px] uppercase tracking-[0.3em] text-center placeholder:text-gray-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {(mode === 'SET_INITIAL' || mode === 'CHANGE_PASSWORD') && (
            <>
              <div className="border-b border-gray-200 focus-within:border-black transition-colors pb-3">
                <input 
                  type="password" 
                  placeholder={mode === 'CHANGE_PASSWORD' ? "NEW PASSWORD" : "CONFIRM PASSWORD"}
                  className="w-full bg-transparent outline-none text-[11px] uppercase tracking-[0.3em] text-center placeholder:text-gray-200"
                  value={mode === 'CHANGE_PASSWORD' ? newPassword : confirmPassword}
                  onChange={(e) => mode === 'CHANGE_PASSWORD' ? setNewPassword(e.target.value) : setConfirmPassword(e.target.value)}
                />
              </div>
              {mode === 'CHANGE_PASSWORD' && (
                <div className="border-b border-gray-200 focus-within:border-black transition-colors pb-3">
                  <input 
                    type="password" 
                    placeholder="CONFIRM NEW PASSWORD" 
                    className="w-full bg-transparent outline-none text-[11px] uppercase tracking-[0.3em] text-center placeholder:text-gray-200"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}
            </>
          )}
          
          {error && (
            <p className="text-[9px] text-red-500 uppercase tracking-widest text-center animate-shake">
              {error}
            </p>
          )}

          <button 
            type="submit" 
            className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            {mode === 'LOGIN' ? 'Enter Workspace' : 'Update Credentials'}
          </button>
        </form>
        
        <p className="mt-12 text-[9px] text-gray-300 uppercase tracking-[0.2em] text-center leading-relaxed">
          Authorized personnel only.<br/>Leeds Arts University — Portfolio Admin
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
