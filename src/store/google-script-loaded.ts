import { create } from 'zustand';

type GoogleScriptLoadedState = {
  scriptLoaded: boolean;
  setScriptLoaded: (loaded: boolean) => void;
};

export const useGoogleScriptLoadedStore = create<GoogleScriptLoadedState>(
  (set) => ({
    scriptLoaded: false,
    setScriptLoaded: (loaded) => set({ scriptLoaded: loaded }),
  }),
);
