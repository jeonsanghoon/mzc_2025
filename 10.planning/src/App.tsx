import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Monitor, Presentation } from "lucide-react";

import { DashboardApp } from "./apps/dashboard/DashboardApp";
import { PresentationApp } from "./apps/presentation/PresentationApp";

export default function App() {
  const [mode, setMode] = useState<
    "dashboard" | "presentation"
  >("presentation");

  // URL 파라미터로 모드 감지
  useEffect(() => {
    const urlParams = new URLSearchParams(
      window.location.search,
    );
    const urlMode = urlParams.get("mode");
    if (urlMode === "presentation") {
      setMode("presentation");
    }
  }, []);

  // URL 업데이트 없이 모드 전환
  const toggleMode = (
    newMode: "dashboard" | "presentation",
  ) => {
    setMode(newMode);
    // URL 업데이트 (선택사항)
    const url = new URL(window.location.href);
    if (newMode === "presentation") {
      url.searchParams.set("mode", "presentation");
    } else {
      url.searchParams.delete("mode");
    }
    window.history.replaceState({}, "", url.toString());
  };

  // 모드 전환 버튼 (개발용)
  if (mode === "dashboard") {
    return (
      <div>
        {/* 모드 전환 버튼 */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => toggleMode("presentation")}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-xs px-2 py-1"
          >
            <Presentation className="h-3 w-3" />
            <span className="hidden sm:inline">
              프레젠테이션
            </span>
          </Button>
        </div>
        <DashboardApp />
      </div>
    );
  }

  return (
    <div>
      {/* 모드 전환 버튼 */}
      <div className="fixed top-4 right-2 z-50">
        <Button
          onClick={() => toggleMode("dashboard")}
          variant="outline"
          size="sm"
          className="flex items-center gap-1 bg-black/40 border-white/30 text-white hover:bg-black/60 text-xs px-2 py-1 backdrop-blur-sm"
        >
          <Monitor className="h-3 w-3" />
          <span className="hidden sm:inline">대시보드</span>
        </Button>
      </div>
      <PresentationApp />
    </div>
  );
}