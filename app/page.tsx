"use client";

import {
  Core,
  LeftSideBar,
  Menu,
  RightSideBar,
  TopSideBar,
} from "@/components/Structure";
import { Separator } from "@/components/ui/separator";
import { Spin } from "@/components/ui/spin";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactFlowProvider } from "@xyflow/react";

const Home = () => (
  <main className="flex h-screen">
    <div className="w-[calc(100%-84px)]">
      <div className="h-[70px]">
        <TopSideBar />
        <Separator />
      </div>
      <div className="h-[calc(100%-70px)] flex justify-between">
        <LeftSideBar />
        <ReactFlowProvider>
          <Core />
        </ReactFlowProvider>
        
        <RightSideBar />
      </div>
    </div>
    <div className="w-[84px] z-50">
      <Menu />
    </div>
  </main>
);

export default Home;
