import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DateRangePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDates: (checkIn: string, checkOut: string) => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  isOpen,
  onClose,
  onSelectDates,
  initialCheckIn,
  initialCheckOut,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'calendar' | 'holidays'>('calendar');
  const [checkInDate, setCheckInDate] = useState<Date | null>(
    initialCheckIn ? new Date(initialCheckIn) : null
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    initialCheckOut ? new Date(initialCheckOut) : null
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    t('month.january'), t('month.february'), t('month.march'), t('month.april'), 
    t('month.may'), t('month.june'), t('month.july'), t('month.august'),
    t('month.september'), t('month.october'), t('month.november'), t('month.december')
  ];

  const dayNames = [t('day.mon'), t('day.tue'), t('day.wed'), t('day.thu'), t('day.fri'), t('day.sat'), t('day.sun')];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handleDateClick = (day: number, monthOffset: number = 0) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset,
      day
    );

    if (!checkInDate || (checkInDate && checkOutDate)) {
      // Start new selection
      setCheckInDate(selectedDate);
      setCheckOutDate(null);
    } else if (checkInDate && !checkOutDate) {
      // Complete the selection
      if (selectedDate < checkInDate) {
        setCheckOutDate(checkInDate);
        setCheckInDate(selectedDate);
      } else {
        setCheckOutDate(selectedDate);
      }
    }
  };

  const isDateInRange = (date: Date, monthOffset: number = 0) => {
    if (!checkInDate || !checkOutDate) return false;
    
    const currentDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset,
      date.getDate()
    );
    
    return currentDate > checkInDate && currentDate < checkOutDate;
  };

  const isDateSelected = (day: number, monthOffset: number = 0) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset,
      day
    );
    
    return (
      (checkInDate && date.toDateString() === checkInDate.toDateString()) ||
      (checkOutDate && date.toDateString() === checkOutDate.toDateString())
    );
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const monthShort = monthNames[date.getMonth()].substring(0, 3);
    const dayNames = ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'];
    const dayName = dayNames[date.getDay()];
    return `${day.toString().padStart(2, '0')} ${monthShort} ${dayName}`;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleApply = () => {
    if (checkInDate && checkOutDate) {
      onSelectDates(
        checkInDate.toISOString().split('T')[0],
        checkOutDate.toISOString().split('T')[0]
      );
      onClose();
    }
  };

  if (!isOpen) return null;

  const nextMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
  const daysCurrentMonth = getDaysInMonth(currentMonth);
  const daysNextMonth = getDaysInMonth(nextMonthDate);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-48">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full animate-fade-in border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {t('datePicker.title')}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Selected Dates Display */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t('datePicker.checkIn')}</div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-sm text-gray-900 dark:text-white">
                  {checkInDate ? formatDate(checkInDate) : '03 Ara Çar'}
                </span>
              </div>
            </div>
            <div className="flex-1 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t('datePicker.checkOut')}</div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-sm text-gray-900 dark:text-white">
                  {checkOutDate ? formatDate(checkOutDate) : '06 Ara Cts'}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t('datePicker.guests')}</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-900 dark:text-white">
                  👤 2 {t('datePicker.adults')}, 1 {t('datePicker.room')}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('datePicker.calendarSearch')}
            </button>
            <button
              onClick={() => setActiveTab('holidays')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'holidays'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('datePicker.holidays')}
            </button>
          </div>
        </div>

        {/* Calendar Content */}
        {activeTab === 'calendar' && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Current Month */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <button onClick={prevMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <div className="w-6" />
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {daysCurrentMonth.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && handleDateClick(day, 0)}
                      disabled={!day}
                      className={`
                        aspect-square flex items-center justify-center rounded-lg text-xs font-medium
                        ${!day ? 'invisible' : ''}
                        ${isDateSelected(day || 0, 0) ? 'bg-green-500 text-white' : ''}
                        ${isDateInRange(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day || 0), 0) ? 'bg-green-100 dark:bg-green-900/20' : ''}
                        ${!isDateSelected(day || 0, 0) && !isDateInRange(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day || 0), 0) ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white' : ''}
                      `}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Month */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-6" />
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {monthNames[nextMonthDate.getMonth()]} {nextMonthDate.getFullYear()}
                  </h3>
                  <button onClick={nextMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {daysNextMonth.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && handleDateClick(day, 1)}
                      disabled={!day}
                      className={`
                        aspect-square flex items-center justify-center rounded-lg text-xs font-medium
                        ${!day ? 'invisible' : ''}
                        ${isDateSelected(day || 0, 1) ? 'bg-green-500 text-white' : ''}
                        ${isDateInRange(new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), day || 0), 1) ? 'bg-green-100 dark:bg-green-900/20' : ''}
                        ${!isDateSelected(day || 0, 1) && !isDateInRange(new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), day || 0), 1) ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white' : ''}
                      `}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleApply}
                disabled={!checkInDate || !checkOutDate}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                {t('datePicker.apply')}
              </button>
            </div>
          </div>
        )}

        {/* Holidays Tab (Placeholder) */}
        {activeTab === 'holidays' && (
          <div className="p-4">
            <div className="text-center py-8">
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('datePicker.holidaysComingSoon')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
