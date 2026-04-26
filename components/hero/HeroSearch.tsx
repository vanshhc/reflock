"use client";

import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const SUFFIXES = [" products", " communities", " cohorts", " courses", " templates", " AI tools", " coaching"];
const PREFIX = "Explore";
const TYPE_SPEED = 75;
const DELETE_SPEED = 45;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 350;

export function HeroSearch() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [displayText, setDisplayText] = useState(PREFIX);
  const suffixIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const suffix = SUFFIXES[suffixIndex.current];
      const full = PREFIX + suffix;

      if (!isDeleting.current) {
        if (displayText.length < full.length) {
          setDisplayText(full.slice(0, displayText.length + 1));
          timeout = setTimeout(tick, TYPE_SPEED);
        } else {
          timeout = setTimeout(() => {
            isDeleting.current = true;
            tick();
          }, PAUSE_AFTER_TYPE);
        }
      } else {
        if (displayText.length > PREFIX.length) {
          setDisplayText(displayText.slice(0, -1));
          timeout = setTimeout(tick, DELETE_SPEED);
        } else {
          isDeleting.current = false;
          suffixIndex.current = (suffixIndex.current + 1) % SUFFIXES.length;
          timeout = setTimeout(tick, PAUSE_AFTER_DELETE);
        }
      }
    }

    timeout = setTimeout(tick, TYPE_SPEED);
    return () => clearTimeout(timeout);
  }, [displayText]);

  const showOverlay = !focused && value === "";

  return (
    <div className="relative max-w-[440px]">
      <Search
        size={18}
        strokeWidth={2}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-gray-600)] pointer-events-none z-10"
      />
      {showOverlay && (
        <div className="absolute left-11 top-1/2 -translate-y-1/2 text-sm text-[var(--color-gray-600)] pointer-events-none select-none">
          <span className="text-[var(--color-gray-500)]">{PREFIX}</span><span>{displayText.slice(PREFIX.length)}</span><span className="cursor-blink inline-block align-middle w-[1.5px] h-[13px] bg-[var(--color-gray-600)] ml-[1px]" />
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-white/5 border border-white/10 text-[var(--color-off-white)] rounded-full pl-11 pr-5 py-3.5 text-sm outline-none focus:border-white/20 transition-colors duration-150"
      />
    </div>
  );
}
