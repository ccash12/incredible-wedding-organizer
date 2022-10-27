import React from "react";

export default function Background() {
  return (
    <div>
      <div className="lg:hidden w-full -rotate-12 h-10 bottom-32 left-0 fixed rounded-full bg-red-400/20" />
      <div className="lg:hidden w-full -rotate-12 h-10 bottom-44 left-0 fixed rounded-full bg-yellow-400/20" />
      <div className="lg:hidden w-full -rotate-12 h-10 bottom-56 left-0 fixed rounded-full bg-green-400/20" />

      <div className="hidden lg:inline w-10 h-full bottom-10 left-[0px] fixed rounded-full bg-red-400/20" />
      <div className="hidden lg:inline w-10 h-full bottom-32 left-[40px] fixed rounded-full bg-yellow-400/20" />
      <div className="hidden lg:inline w-10 h-full bottom-52 left-[80px] fixed rounded-full bg-green-400/20" />
      <div className="hidden xl:inline w-10 h-full bottom-80 left-[120px] fixed rounded-full bg-purple-400/20" />

      <div className="hidden lg:inline w-10 h-full bottom-10 right-[0px] fixed rounded-full bg-red-400/20" />
      <div className="hidden lg:inline w-10 h-full bottom-32 right-[40px] fixed rounded-full bg-yellow-400/20" />
      <div className="hidden lg:inline w-10 h-full bottom-52 right-[80px] fixed rounded-full bg-green-400/20" />
      <div className="hidden xl:inline w-10 h-full bottom-80 right-[120px] fixed rounded-full bg-purple-400/20" />
    </div>
  );
}
