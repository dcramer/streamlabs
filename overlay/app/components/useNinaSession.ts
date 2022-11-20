import { createContext, useContext, useEffect, useState } from "react";
import { NinaSessionData } from "../../types";

export const NinaSessionContext = createContext<null | NinaSessionData>(null);

export default function useNinaSession() {
  const context = useContext(NinaSessionContext);

  return context;
}
