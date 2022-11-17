import { useEffect, useState } from "react";

export function usePolling<T>(endpoint: string, interval: number = 30000) {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    let timer: any;

    function update() {
      console.log(`Polling ${endpoint}`);
      fetch(endpoint)
        .then(async (r) => {
          const data = await r.json();
          setValue(data);
        })
        .catch((e) => {});

      timer = setTimeout(update, interval);
    }

    timer = setTimeout(update, 1000);

    return () => clearTimeout(timer);
  }, [endpoint, interval]);

  return value;
}
