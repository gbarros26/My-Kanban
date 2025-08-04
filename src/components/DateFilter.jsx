import { useState } from 'react';

export default function DateFilter({ selectedDate, onDateChange }) {
  return (
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => onDateChange(e.target.value)}
      className="bg-white text-black px-3 py-1 rounded border border-gray-300"
    />
  );
}
