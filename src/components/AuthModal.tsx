import React, { useState } from 'react';
import { X, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      toast({ title: 'Xəta', description: 'Şərtləri qəbul etməlisiniz.', variant: 'destructive' });
      return;
    }
    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        toast({ title: 'Giriş xətası', description: 'E-poçt və ya şifrə yanlışdır.', variant: 'destructive' });
      } else {
        toast({ title: 'Uğurlu giriş', description: 'Xoş gəldiniz!' });
        onClose();
        navigate('/account');
      }
    } else {
      if (!formData.fullName.trim()) {
        toast({ title: 'Xəta', description: 'Ad Soyad daxil edin.', variant: 'destructive' });
        setLoading(false);
        return;
      }
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      if (error) {
        toast({ title: 'Qeydiyyat xətası', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Xoş gəldiniz!', description: 'Hesabınız yaradıldı.' });
        onClose();
        navigate('/account');
      }
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full animate-fade-in overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === 'login' ? 'Üzv Girişi' : 'Qeydiyyat'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex mx-6 mb-4 bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Daxil Ol
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === 'register'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Qeydiyyat
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {mode === 'register' && (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Ad Soyad"
              className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="E-poçt Ünvanı"
            className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Şifrə"
              className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg pr-12"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {mode === 'login' && (
            <div className="text-left">
              <button type="button" className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                Şifrənizi unutmusunuz?
              </button>
            </div>
          )}

          <div className="text-xs text-gray-500 dark:text-gray-400">
            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-0.5 flex-shrink-0"
              />
              <span>
                <a href="/terms-conditions" className="text-blue-500 hover:underline">İstifadə Şərtləri</a> və{' '}
                <a href="/privacy-policy" className="text-blue-500 hover:underline">Məxfilik Siyasətini</a> qəbul edirəm.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Daxil Ol' : 'Qeydiyyatdan Keç'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {mode === 'login' ? 'Hesabınız yoxdur? ' : 'Artıq hesabınız var? '}
            </span>
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-blue-500 hover:text-blue-600 font-medium text-sm"
            >
              {mode === 'login' ? 'Qeydiyyatdan Keç' : 'Daxil Ol'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
