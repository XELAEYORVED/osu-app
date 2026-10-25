// État global de l'app, sauvegardé sur le téléphone (AsyncStorage).
// Les écrans n'accèdent aux données que par le hook useStore().
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { seedState, emptyState } from './seed';
import type { AppState, Session } from './types';

const KEY = 'osu/state/v1';

type Store = {
  ready: boolean;
  state: AppState;
  toggleMastered: (techniqueId: string) => void;
  isMastered: (techniqueId: string) => boolean;
  addSession: (session: Omit<Session, 'id'>) => void;
  deleteSession: (id: string) => void;
  resetToEmpty: () => void;
  resetToSample: () => void;
};

const StoreContext = createContext<Store | null>(null);

function isValidState(v: unknown): v is AppState {
  const s = v as AppState;
  return !!s && s.version === 1 && Array.isArray(s.mastered) && Array.isArray(s.sessions);
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(emptyState);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  // Chargement au démarrage (données d'exemple au tout premier lancement)
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        const parsed: unknown = raw ? JSON.parse(raw) : null;
        setState(isValidState(parsed) ? parsed : seedState);
      } catch {
        setState(seedState);
      } finally {
        loaded.current = true;
        setReady(true);
      }
    })();
  }, []);

  // Sauvegarde à chaque changement
  useEffect(() => {
    if (!loaded.current) return;
    AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {});
  }, [state]);

  const toggleMastered = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      mastered: s.mastered.includes(id) ? s.mastered.filter((m) => m !== id) : [...s.mastered, id],
    }));
  }, []);

  const addSession = useCallback((session: Omit<Session, 'id'>) => {
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    setState((s) => ({ ...s, sessions: [...s.sessions, { ...session, id }] }));
  }, []);

  const deleteSession = useCallback((id: string) => {
    setState((s) => ({ ...s, sessions: s.sessions.filter((x) => x.id !== id) }));
  }, []);

  const value = useMemo<Store>(
    () => ({
      ready,
      state,
      toggleMastered,
      isMastered: (id) => state.mastered.includes(id),
      addSession,
      deleteSession,
      resetToEmpty: () => setState(emptyState),
      resetToSample: () => setState(seedState),
    }),
    [ready, state, toggleMastered, addSession, deleteSession],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore doit être utilisé dans <StoreProvider>');
  return ctx;
}
