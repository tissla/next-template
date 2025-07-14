'use client';

import { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = 'Select..',
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-muted border border-border rounded text-sm text-left flex items-center justify-between hover:border-primary focus:outline-none focus:border-primary transition-colors"
      >
        <span className="flex items-center gap-2">
          {selectedOption?.icon && <span>{selectedOption.icon}</span>}
          <span>{selectedOption?.label || placeholder}</span>
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-muted border border-border rounded shadow-lg animate-slide-down">
          <div className="max-h-60 overflow-y-auto scrollbar-thin">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-3 py-2 text-sm text-left flex items-center gap-2 hover:bg-primary hover:text-background transition-colors ${
                  value === option.value ? 'bg-primary/40' : ''
                }`}
              >
                {option.icon && <span>{option.icon}</span>}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
