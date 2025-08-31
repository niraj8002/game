import { Crown } from "lucide-react";
import "./earing.css";

const AVATAR = "/images/sample-avatar.jpg";

const podiumData = [
  { rank: 2, name: "Mem***UKX", amount: "₹19,404,000,000.00", avatar: AVATAR },
  { rank: 1, name: "Mem***DIU", amount: "₹20,865,824,475.93", avatar: AVATAR },
  { rank: 3, name: "Mem***OHL", amount: "₹1,422,833,728.96", avatar: AVATAR },
];

const listData = [
  { rank: 4, name: "Mem***6CR", amount: "₹1,017,027,420.36", avatar: AVATAR },
  { rank: 5, name: "Mem***5AZ", amount: "₹629,602,172.08", avatar: AVATAR },
  { rank: 6, name: "Mem***FP2", amount: "₹386,834,802.20", avatar: AVATAR },
];

function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}

function Ribbon({ text, tone }) {
  return <span className={cls("ec-ribbon", `ec-ribbon--${tone}`)}>{text}</span>;
}

function AmountPill({ value }) {
  return <div className="ec-amount-pill">{value}</div>;
}

function Avatar({ src, alt, tone }) {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={cls("ec-avatar", `ec-avatar--${tone}`)}
    />
  );
}

function PodiumBlock({ item, tall }) {
  const tone = item.rank === 1 ? "gold" : item.rank === 2 ? "silver" : "bronze";
  return (
    <div className="ec-podium">
      <div className="ec-podium-top">
        <div className={cls("ec-crown", `ec-crown--${tone}`)}>
          <Crown size={24} />
        </div>
        <Avatar
          src={item.avatar}
          alt={`Avatar rank ${item.rank}`}
          tone={tone}
        />
        <div className="ec-ribbon-wrap">
          <Ribbon text={`NO${item.rank}`} tone={tone} />
        </div>
      </div>

      <div
        className={cls("ec-podium-body", `ec-podium-body--${tone}`)}
        style={{ height: tall ? 220 : 160 }}
      >
        <div className="ec-podium-name">{item.name}</div>
        <div className="ec-podium-amount">
          <AmountPill value={item.amount} />
        </div>
      </div>
    </div>
  );
}

export default function EarningsChartCRA() {
  return (
    <section className="ec-section" aria-labelledby="ec-title">
      <header className="ec-header">
        <span className="ec-header-accent" aria-hidden="true" />
        <h2 id="ec-title" className="ec-title">
          {"Today's earnings chart"}
        </h2>
      </header>

      <div className="ec-podium-grid">
        <PodiumBlock item={podiumData[0]} tall={false} />
        <PodiumBlock item={podiumData[1]} tall={true} />
        <PodiumBlock item={podiumData[2]} tall={false} />
      </div>

      <div className="ec-list">
        {listData.map((row) => (
          <div key={row.rank} className="ec-list-item">
            <div className="ec-list-left">
              <div className="ec-rank-badge">{row.rank}</div>
              <div className="ec-list-user">
                <img
                  src={row.avatar || "/placeholder.svg"}
                  alt={`Avatar rank ${row.rank}`}
                  className="ec-list-avatar"
                />
                <span className="ec-list-name">{row.name}</span>
              </div>
            </div>
            <AmountPill value={row.amount} />
          </div>
        ))}
      </div>
    </section>
  );
}
