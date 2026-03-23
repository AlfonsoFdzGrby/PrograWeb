import { useEffect } from "react";

const BS_CSS   = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
const BS_ICONS = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css";

export function useBootstrap() {
  useEffect(() => {
    [BS_CSS, BS_ICONS].forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = href;
        document.head.appendChild(l);
      }
    });

    const id = "bs-bundle";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
      document.body.appendChild(s);
    }
  }, []);
}
