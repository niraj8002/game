

import {
  Bell,
  Gift,
  BarChart3,
  Globe,
  ChevronRight,
  RotateCcw,
  Power,
  Crown,
  CreditCard,
  ArrowDownToLine,
  ArrowUpFromLine,
  Gamepad2,
  Wallet,
  HeadphonesIcon,
  MessageSquare,
  Megaphone,
  Settings,
  BookOpen,
  Info,
} from "lucide-react";
import user1 from "../../assets/user.png";
import { RiVipLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaWallet } from "react-icons/fa6";
import { HiWallet } from "react-icons/hi2";
import { FaMoneyCheck } from "react-icons/fa";
import { RiBankCardFill } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { IoDiamondOutline } from "react-icons/io5";
import img from "../../assets/notebook.png";
import img2 from "../../assets/top-up.png";
import { borderRadius } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../globalContext";
import axiosInstance from "../../axiosInstance";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#dd9138] px-2 mb-1 py-0.5 text-[10px] font-medium text-white">
      {children}
    </span>
  );
}

function HeaderCard() {
const user = useContext(UserContext);
const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      
    }, []); // update every second
setDateTime(new Date());
    return () => clearInterval(timer); // cleanup
  }, []);
  return (
    <header className=" bg-gradient-to-br from-[#f1d78f] to-[#c48716] px-4 pb-6 py-10 text-white  rounded-b-3xl h-[30vh]">
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-white/30">
          <img src={user1} alt="Profile avatar" width={56} height={56} />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-1">
            <h1 className="text-balance text-base font-bold tracking-wide "style={{color:"white"}}>
              {user.userName}
            </h1>
           
            
            
          <img src={"https://bdgwinbet8.com/assets/png/0-78e1ab02.webp"} alt="Profile avatar" width={50} height={50} />
            
          </div>
          <div className="mt-1 flex items-center gap-2">
  {/* UID pill */}
  <div
    className="flex items-center gap-1 px-2 py-[2px] rounded-md text-[11px] font-semibold text-white"
    style={{ backgroundColor: "#DD9138" }}
  >
    <span>UID | 127666{user.memberId}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14px"
      height="14px"
      viewBox="0 0 640 640"
      fill="currentColor"
    >
      <path d="M480 400L288 400C279.2 400 272 392.8 272 384L272 128C272 119.2 279.2 112 288 112L421.5 112C425.7 112 429.8 113.7 432.8 116.7L491.3 175.2C494.3 178.2 496 182.3 496 186.5L496 384C496 392.8 488.8 400 480 400zM288 448L480 448C515.3 448 544 419.3 544 384L544 186.5C544 169.5 537.3 153.2 525.3 141.2L466.7 82.7C454.7 70.7 438.5 64 421.5 64L288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L368 496L368 512C368 520.8 360.8 528 352 528L160 528C151.2 528 144 520.8 144 512L144 256C144 247.2 151.2 240 160 240L176 240L176 192L160 192z" />
    </svg>
  </div>

  {/* Last login */}
  
</div>
<span className="text-[12px] text-white/85">
    Last login: {dateTime.toLocaleDateString()}  {dateTime.toLocaleTimeString()}
  </span>
        </div>
      </div>
    </header>
  );
}

function BalanceCard() {

  const [wallet ,setWallet] = useState(null)

  

  const user = useContext(UserContext);
  let navigate = useNavigate();
  useEffect(() => {
    
    let mounted = true;
    if (mounted) {

   
      if (user.userId == null) {
       window.location.reload(true);
      }

      
    }
    pageLoad();
    return () => (mounted = false);
  }, []);

  const pageLoad = () => {
    // if(props.ppp===true){
    //   window.location.reload(true);
    //  props.ppp(false)
    // }
     
    getWallet()
   
  }

    const getWallet = () => {
    axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
        let amount = res.data.data.depositeAmount +res.data.data.winningAmount;
        setWallet(Math.floor(amount));
    });
  }
  return (
    <section className="-mt-20 mx-4 rounded-2xl  bg-[#333332] p-4 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-400">Total balance</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-2xl font-bold">₹{wallet}.00</p>
            <button
              className="rounded-md p-1 text-zinc-400 hover:bg-white/5"
              aria-label="Refresh balance"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          {/* <p className="text-xs text-zinc-400">wallet</p> */}
          <Link
            to="/Wallet"
            className="rounded-3xl px-[12px] py-[6px] text-[13px] font-medium text-white bg-[#d9ac4f] hover:bg-[#c38b2e]"
            aria-label="Refresh balance"
          >
            Enter wallet
          </Link>
        </div>
      </div>
      {/* Actions */}
      <div className="grid grid-cols-4 gap-3">
        <ActionTile
          icon={
            <Wallet
              className="h-7 w-7 text-rose-500"
              fill="currentColor" // 👈 yeh add karo
            />
          }
          label="ARWallet"
        />

        <ActionTile
          // color="bg-orange-500"
          icon={<HiWallet className="h-7 w-7 text-orange-500" />}
          label="Deposit"
        />
        <ActionTile
          // color="bg-sky-500"
          icon={<FaWallet className="h-7 w-7 text-sky-500" />}
          label="Withdraw"
        />
        <ActionTile
          // color="bg-emerald-500"
          icon={<IoDiamondOutline className="h-7 w-7 text-emerald-500" />}
          label="VIP"
        />
      </div>
    </section>
  );
}

function ActionTile({ color, icon, label }) {
  return (
    <div className="text-center">
      <div
        className={`mx-auto mb- flex h-8 w-8 items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>
      <span className="text-[11px] text-zinc-300">{label}</span>
    </div>
  );
}

function ShortcutGrid() {
  return (
    <section className="grid grid-cols-2 gap-3 p-4">
      {/* <ShortcutCard
        color="bg-sky-500"
        icon={<Gamepad2 className="h-7 w-7 text-[#f1e6ce]" />}
        title="Game History"
        subtitle="My game history"
      /> */}
      <ShortcutCard
        // color="bg-emerald-500"
        icon={<img src={img} className="h-8 w-8 filter-blue" />}
        title="Game History"
        subtitle="My game history"
      />
      {/* <ShortcutCard
        color="bg-emerald-500"
        icon={<GrTransaction className="h-7 w-7 text-[#f1e6ce]" />}
        title="Transaction"
        subtitle="My Transaction history"
      /> */}
      <ShortcutCard
        // color="bg-emerald-500"
        icon={
          <img
            src={img} // apni image ka path (public folder me rakho)
            alt="notebook"
            className="h-8 w-8 green-sky"
          />
        }
        title="Transaction"
        subtitle="My Transaction history"
      />

      <ShortcutCard
        // color="bg-rose-500"
        icon={<HiWallet className="h-9 w-9 text-rose-500" />}
        title="Deposit"
        subtitle="My deposit history"
      />
      <ShortcutCard
        // color="bg-orange-500"
        icon={
          <img
            src={img2} // apni image ka path (public folder me rakho)
            alt="notebook"
            className="h-9 w-9 withdrow-key"
          />
        }
        title="Withdraw"
        subtitle="My withdraw history"
      />
    </section>
  );
}

function ShortcutCard({ color, icon, title, subtitle }) {
  return (
    <div className="flex items-center rounded-xl  bg-[#333332] p-2">
      <div
        className={`mr-3 flex h-10 w-12 items-center justify-center  ${color} rounded-xl`}
      >
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-medium text-white">{title}</div>
        <div className="text-[9px] text-zinc-400">{subtitle}</div>
      </div>
    </div>
  );
}

function Row({ icon, label, end, badge }) {
  return (
    <div className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center">
        <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-lg ">
          {icon}
        </div>
        <span className="text-sm text-white">{label}</span>
      </div>
      <div className="flex items-center">
        {typeof badge === "number" && (
          <span className="mr-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-medium text-white">
            {badge}
          </span>
        )}
        {end}
        <ChevronRight className="ml-2 h-5 w-5 text-zinc-500" />
      </div>
    </div>
  );
}

function ListMenu() {
  return (
    <section className="px-4">
      <div className="border-b border-white/20">
        <Row
          icon={<Bell className="h-6 w-6 text-[#d9ac4f]" />}
          label="Notification"
          badge={1}
        />
      </div>
      <div className="border-b border-white/20">
        <Row icon={<Gift className="h-6 w-6 text-[#d9ac4f]" />} label="Gifts" />
      </div>
      <div className="border-b border-white/20">
        <Row
          icon={<BarChart3 className="h-6 w-6 text-[#d9ac4f]" />}
          label="Game statistics"
        />
      </div>
      <div className="border-b border-white/20">
        <Row
          icon={<Globe className="h-6 w-6 text-[#d9ac4f]" />}
          label="Language"
          end={<span className="text-xs text-zinc-400">English</span>}
        />
      </div>
    </section>
  );
}

function ServiceCenter() {
  const items = [
    {
      icon: <Settings className="h-7 w-7 text-[#d9ac4f]" />,
      label: "Settings",
    },
    {
      icon: <MessageSquare className="h-7 w-7 text-[#d9ac4f]" />,
      label: "Feedback",
    },
    {
      icon: <Megaphone className="h-7 w-7 text-[#d9ac4f]" />,
      label: "Announcement",
    },
    {
      icon: <HeadphonesIcon className="h-7 w-7 text-[#d9ac4f]" />,
      label: "Customer Service",
    },
    {
      icon: <BookOpen className="h-7 w-7 text-[#d9ac4f]" />,
      label: "Beginner's Guide",
    },
    { icon: <Info className="h-7 w-7 text-[#d9ac4f]" />, label: "About us" },
  ];

  return (
    <section className="px-4">
      <h3 className="py-3 text-xs text-zinc-500">Service center</h3>
      <div className="rounded-2xl p-">
        <div className="grid grid-cols-3 gap-2">
          {items.map((it) => (
            <button
              key={it.label}
              className="group flex h-20 flex-col items-center justify-center gap-2 rounded-xl p-3 "
            >
              <span className="flex h-10 w-16 items-center justify-center rounded-md ">
                {it.icon}
              </span>
              <span className="text-center text-[12px] font-medium text-gray-300 leading-tight tracking-tight">
                {it.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoutButton({ navigate }) {
    const handleLogout = () => {
   
// window.location.href="https://lk.gggred.com/?rmc=05213835&gt=0";
    localStorage.clear();
    // navigate(`${environment.url.AUTH_URL}`, { replace: true });
    // navigate('/LoginScreen', { replace: true });
    // window.location.href=`${environment.url.AUTH_URL}`;
    window.location.href = `/LoginScreen`;
  }   
  return (
    <div className="px-4 py-6 mb-5">
      <button
        className="mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-full border border-[#d9ac4f]/70 px-4 py-3 text-amber-400 hover:bg-amber-500/10"
        onClick={() => handleLogout()}
      >
        <Power className="h-4 w-4" />
        <span className="text-sm font-medium">Log out</span>
      </button>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-black font-sans text-white">
      <HeaderCard />
      <BalanceCard />
      <ShortcutGrid />
      <ListMenu />
      <ServiceCenter />
      <LogoutButton navigate={navigate} />
      <div className="h-8" />
    </main>
  );
}
