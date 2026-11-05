"use client";

import { useEffect, useState } from "react";
import {
  DEMO_SESSION_EVENT,
  readDemoSession,
  type DemoSession,
} from "./demo";

export default function useDemoSession() {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setSession(readDemoSession());
      setReady(true);
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(DEMO_SESSION_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(DEMO_SESSION_EVENT, sync);
    };
  }, []);

  return { session, ready };
}
