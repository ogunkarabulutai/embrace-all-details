import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, CreditCard, LogOut, Edit3, Save, X, Plane, Hotel, Package, Clock, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '../contexts/LanguageContext';

interface Profile { full_name: string | null; phone: string | null; date_of_birth: string | null; passport_number: string | null; }
interface Reservation { id: string; title: string; type: string; destination: string | null; start_date: string | null; end_date: string | null; guests: number | null; total_price: number | null; currency: string | null; status: string; created_at: string; details: any; }

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile>({ full_name: null, phone: null, date_of_birth: null, passport_number: null });
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [activeTab, setActiveTab] = useState<'reservations' | 'profile'>('reservations');
  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState<Profile>({ full_name: null, phone: null, date_of_birth: null, passport_number: null });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/'); return; }
      setUser(user);
      await Promise.all([fetchProfile(user.id), fetchReservations(user.id)]);
      setLoading(false);
    };
    getUser();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('user_id', userId).single();
    if (data) { setProfile(data); setEditProfile(data); }
  };

  const fetchReservations = async (userId: string) => {
    const { data } = await supabase.from('reservations').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (data) setReservations(data as Reservation[]);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from('profiles').update({ full_name: editProfile.full_name, phone: editProfile.phone, date_of_birth: editProfile.date_of_birth, passport_number: editProfile.passport_number }).eq('user_id', user.id);
    setProfile(editProfile);
    setEditMode(false);
    setSaving(false);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate('/'); };

  const getTypeIcon = (type: string) => {
    if (type === 'tour') return <Package className="w-5 h-5" />;
    if (type === 'hotel') return <Hotel className="w-5 h-5" />;
    return <Plane className="w-5 h-5" />;
  };

  const getTypeLabel = (type: string) => {
    if (type === 'tour') return t('account.tour');
    if (type === 'hotel') return t('account.hotel');
    return t('account.flight');
  };

  const getStatusColor = (status: string) => {
    if (status === 'confirmed') return 'text-green-600 bg-green-50 border-green-200';
    if (status === 'pending') return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (status === 'cancelled') return 'text-red-600 bg-red-50 border-red-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'confirmed') return t('account.confirmed');
    if (status === 'pending') return t('account.pending');
    if (status === 'cancelled') return t('account.cancelled');
    return status;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">{t('account.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {profile.full_name ? profile.full_name[0].toUpperCase() : user?.email?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div>
              <h1 className="text-xl font-bold">{profile.full_name || t('account.user')}</h1>
              <p className="text-orange-100 text-sm">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            <LogOut className="w-4 h-4" />{t('account.logout')}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 bg-white dark:bg-gray-900 rounded-2xl p-1.5 shadow-sm border border-gray-100 dark:border-gray-800 w-fit">
          <button onClick={() => setActiveTab('reservations')} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'reservations' ? 'bg-orange-500 text-white shadow' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}`}>
            {t('account.myReservations')}
          </button>
          <button onClick={() => setActiveTab('profile')} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'profile' ? 'bg-orange-500 text-white shadow' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}`}>
            {t('account.profileInfo')}
          </button>
        </div>

        {activeTab === 'reservations' && (
          <div>
            {reservations.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4"><Package className="w-8 h-8 text-orange-400" /></div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('account.noReservation')}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{t('account.noReservationDesc')}</p>
                <button onClick={() => navigate('/')} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors">{t('account.searchTour')}</button>
              </div>
            ) : (
              <div className="space-y-4">
                {reservations.map((res) => (
                  <div key={res.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 flex-shrink-0">{getTypeIcon(res.type)}</div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-medium text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-full">{getTypeLabel(res.type)}</span>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusColor(res.status)}`}>{getStatusLabel(res.status)}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mt-1 text-base leading-tight">{res.title}</h3>
                            {res.destination && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{res.destination}</p>}
                          </div>
                        </div>
                        {res.total_price && (
                          <div className="text-right flex-shrink-0">
                            <div className="text-xl font-bold text-gray-900 dark:text-white">{res.total_price.toLocaleString('az-AZ')} {res.currency || 'AZN'}</div>
                            {res.guests && <div className="text-xs text-gray-400 mt-0.5">{res.guests} {t('account.persons')}</div>}
                          </div>
                        )}
                      </div>
                      {(res.start_date || res.end_date) && (
                        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
                          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span>{formatDate(res.start_date)}</span>
                          {res.end_date && res.end_date !== res.start_date && (<><ChevronRight className="w-4 h-4 text-gray-300" /><span>{formatDate(res.end_date)}</span></>)}
                          <Clock className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                          <span className="text-xs text-gray-400">{new Date(res.created_at).toLocaleDateString('az-AZ')} {t('account.orderedOn')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-semibold text-gray-900 dark:text-white">{t('account.personalInfo')}</h2>
              {!editMode ? (
                <button onClick={() => setEditMode(true)} className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 text-sm font-medium"><Edit3 className="w-4 h-4" />{t('account.edit')}</button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => { setEditMode(false); setEditProfile(profile); }} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700"><X className="w-4 h-4" />{t('account.cancel')}</button>
                  <button onClick={handleSaveProfile} disabled={saving} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"><Save className="w-4 h-4" />{saving ? t('account.saving') : t('account.save')}</button>
                </div>
              )}
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{t('account.emailLabel')}</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-400 text-sm"><Mail className="w-4 h-4 text-gray-400" />{user?.email}</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{t('account.fullName')}</label>
                {editMode ? (
                  <input type="text" value={editProfile.full_name || ''} onChange={(e) => setEditProfile({ ...editProfile, full_name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-orange-300 dark:border-orange-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder={t('account.enterName')} />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-800 dark:text-gray-200 text-sm"><User className="w-4 h-4 text-gray-400" />{profile.full_name || <span className="text-gray-400 italic">{t('account.notEntered')}</span>}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{t('account.phone')}</label>
                {editMode ? (
                  <input type="tel" value={editProfile.phone || ''} onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-orange-300 dark:border-orange-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="+994 XX XXX XX XX" />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-800 dark:text-gray-200 text-sm"><Phone className="w-4 h-4 text-gray-400" />{profile.phone || <span className="text-gray-400 italic">{t('account.notEntered')}</span>}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{t('account.birthDate')}</label>
                {editMode ? (
                  <input type="date" value={editProfile.date_of_birth || ''} onChange={(e) => setEditProfile({ ...editProfile, date_of_birth: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-orange-300 dark:border-orange-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400" />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-800 dark:text-gray-200 text-sm"><Calendar className="w-4 h-4 text-gray-400" />{profile.date_of_birth ? formatDate(profile.date_of_birth) : <span className="text-gray-400 italic">{t('account.notEntered')}</span>}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{t('account.passport')}</label>
                {editMode ? (
                  <input type="text" value={editProfile.passport_number || ''} onChange={(e) => setEditProfile({ ...editProfile, passport_number: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-orange-300 dark:border-orange-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="AA 0000000" />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-800 dark:text-gray-200 text-sm"><CreditCard className="w-4 h-4 text-gray-400" />{profile.passport_number || <span className="text-gray-400 italic">{t('account.notEntered')}</span>}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
