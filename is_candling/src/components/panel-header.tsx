"use client";

import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";
export default function PanelHeader() {
  const { setOpenMobile } = useSidebar();

  function handleOpenSidebar() {
    setOpenMobile(true);
  }

  return (
    <div className="md:hidden block">
      <div className="pt-4 pb-2 px-4  flex justify-between items-center">
        <button
          onClick={handleOpenSidebar}
          className="cursor-pointer"
        >
          <PanelLeft className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
