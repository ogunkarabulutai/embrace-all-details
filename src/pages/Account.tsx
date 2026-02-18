import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, FileText, Calendar, LogOut, Plane, Hotel, Map, Clock, Edit2, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const tabs = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'reservations', label: 'Sifarişlərim', icon: Clock },
];

const typeIcons: Record<string, React.ElementType> = {
  tour: Map,
  hotel: Hotel,
  flight: Plane,
};

const typeLabels: Record<string, string> = {
  tour: 'Tur',
  hotel: 'Otel',
  flight: 'Uçuş',
};

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  confirmed: 'Təsdiqləndi',
  pending: 'Gözləmədə',
  cancelled: 'Ləğv edildi',
};

const Account: React.FC = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    passport_number: profile?.passport_number || '',
    date_of_birth: profile?.date_of_birth || '',
  });

  React.useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        passport_number: profile.passport_number || '',
        date_of_birth: profile.date_of_birth || '',
      });
    }
  }, [profile]);

  const { data: reservations = [], isLoading: loadingRes } = useQuery({
    queryKey: ['reservations', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateProfile(formData);
    if (error) {
      toast({ title: 'Xəta', description: 'Məlumatlar yenilənmədi.', variant: 'destructive' });
    } else {
      toast({ title: 'Uğurlu', description: 'Profil məlumatları yeniləndi.' });
      setEditing(false);
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast({ title: 'Çıxış edildi', description: 'Hesabınızdan çıxış etdiniz.' });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {profile?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile?.full_name || 'İstifadəçi'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Çıxış</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 bg-white dark:bg-gray-900 p-1 rounded-2xl shadow-sm">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-blue-500 text-white shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Şəxsi Məlumatlar</h2>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 font-medium text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Düzəliş Et</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 disabled:opacity-60"
                  >
                    <Check className="w-4 h-4" />
                    <span>{saving ? 'Yadda saxlanılır...' : 'Yadda Saxla'}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'full_name', label: 'Ad Soyad', icon: User, type: 'text', placeholder: 'Adınızı daxil edin' },
                { key: 'phone', label: 'Telefon', icon: Phone, type: 'tel', placeholder: '+994 XX XXX XX XX' },
                { key: 'passport_number', label: 'Pasport / Vəsiqə No', icon: FileText, type: 'text', placeholder: 'Pasport nömrəsi' },
                { key: 'date_of_birth', label: 'Doğum Tarixi', icon: Calendar, type: 'date', placeholder: '' },
              ].map(({ key, label, icon: Icon, type, placeholder }) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </label>
                  {editing ? (
                    <input
                      type={type}
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-white">
                      {formData[key as keyof typeof formData] || <span className="text-gray-400 text-sm">Daxil edilməyib</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">E-poçt:</span> {user.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span className="font-medium">Qeydiyyat tarixi:</span>{' '}
                {new Date(user.created_at).toLocaleDateString('az-AZ')}
              </p>
            </div>
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            {loadingRes ? (
              <div className="text-center py-12 text-gray-400">Yüklənir...</div>
            ) : reservations.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-12 text-center">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Sifariş tapılmadı</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Hələ heç bir sifariş verməmisiniz.</p>
              </div>
            ) : (
              reservations.map((res: any) => {
                const Icon = typeIcons[res.type] || Map;
                return (
                  <div key={res.id} className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{typeLabels[res.type]}</p>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{res.title}</h3>
                          {res.destination && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">{res.destination}</p>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[res.status]}`}>
                        {statusLabels[res.status]}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        {res.start_date && (
                          <span>{new Date(res.start_date).toLocaleDateString('az-AZ')}</span>
                        )}
                        {res.guests && <span>{res.guests} nəfər</span>}
                      </div>
                      {res.total_price && (
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {res.total_price} {res.currency}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
