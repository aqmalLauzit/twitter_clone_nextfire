import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function Sidebar() {
  const {data: session} = useSession();
  const router = useRouter()
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-5 overflow-x-hidden">
      {/* Twitter Logo */}
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          width="50"
          height="50"
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          alt="logo twitter"
        ></Image>
      </div>

      {/* Menu */}

      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active/>
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        {session && (
<>
        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
        </>
        )}
      </div>


{session ? (
  <>
  <button 
  
  className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Tweet</button>



  <div 
  onClick={() => signOut()}
  className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto overflow-x-hidden w-full ">
    <img
      src={session?.user?.image}
      alt="user-img"
      className="h-10 w-10 rounded-full xl:mr-2"
    />
    <div className="leading-5 hidden xl:inline">
      <h4 className="font-bold">{session?.user?.name} </h4>
      <p className="text-gray-500 lowercase truncate">@{session?.user?.username}</p>
    </div>
    <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline"/>
  </div>
  </>
) : (
  <button onClick={() => router.push("/auth/signin")} className=" bg-blue-400  rounded-full text-white w-36 h-12 shadow-md font-bold hover:opacity-90 ">Sign In</button>
)}
      {/* Button */}

      
    </div>
  );
}
