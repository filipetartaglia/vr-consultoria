"use client";

import { useCallback, useRef } from "react";
import { useUnmount } from "./use-unmount";

type DebounceOptions = {
  leading?: boolean;
  trailing?: boolean;
};

type ControlFunctions = {
  cancel: () => void;
  flush: () => void;
  isPending: () => boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebouncedState<T extends (...args: any[]) => ReturnType<T>> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) &
  ControlFunctions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounceCallback<T extends (...args: any[]) => ReturnType<T>>(
  func: T,
  delay = 500,
  options: DebounceOptions = {}
): DebouncedState<T> {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgs = useRef<Parameters<T> | null>(null);
  const pending = useRef(false);

  useUnmount(() => {
    if (timer.current) clearTimeout(timer.current);
  });

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    pending.current = false;
  }, []);

  const flush = useCallback(() => {
    if (pending.current && lastArgs.current !== null) {
      func(...lastArgs.current);
      cancel();
    }
  }, [func, cancel]);

  const isPending = useCallback(() => pending.current, []);

  const debounced = useCallback(
    (...args: Parameters<T>): ReturnType<T> | undefined => {
      lastArgs.current = args;

      if (options.leading && !pending.current) {
        pending.current = true;
        return func(...args);
      }

      pending.current = true;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        pending.current = false;
        if (options.trailing !== false) {
          func(...(lastArgs.current ?? args));
        }
        timer.current = null;
      }, delay);

      return undefined;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [func, delay, options.leading, options.trailing]
  ) as DebouncedState<T>;

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.isPending = isPending;

  return debounced;
}
