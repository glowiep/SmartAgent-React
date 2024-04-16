import { MdDashboard, MdEmail, MdOutlineChatBubble } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";

export const menuItems = [
  { icon: <MdDashboard className="w-[30px] h-[30px] "/>, tooltip: 'Dashboard', path: '/dashboard' },
  { icon: <MdEmail className="w-[30px] h-[30px] "/>, tooltip: 'Emails', path: '/main' },
  { icon: <MdOutlineChatBubble className="w-[30px] h-[30px] "/>, tooltip: 'Chat', path: '/chat' },
  { icon: <CgProfile className="w-[30px] h-[30px] "/>, tooltip: 'Profile', path: '/profile' },
  { icon: <GoHomeFill className="w-[30px] h-[30px] "/>, tooltip: 'Welcome Page', path: '/' },
 
];