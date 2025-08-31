import React from "react";
import img1 from "../../assets/lttboll.png";
import img2 from "../../assets/lttmoto.png";
import img3 from "../../assets/lttdis.png";
import img4 from "../../assets/lttbb.png";

// Single card component
const LotteryCard = ({ title, description, image }) => {
  return (
    <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 text-black rounded-xl px-1 flex items-center justify-between shadow-md hover:scale-[1.02] transition-transform duration-200">
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        {/* Display multi-line description correctly */}
        <p className="text-sm whitespace-pre-line">{description}</p>
      </div>
      <img src={image} alt={title} className="w-20  object-cover" />
    </div>
  );
};

// Main component
function LotteryApp() {
  return (
    <div className="bg-gray-900 text-white flex flex-col items-center p-6 space-y-6">
      <h2 className="text-lg font-bold text-yellow-400 w-full text-left">
        Lottery
      </h2>

      <div className="space-y-4 w-full max-w-md">
        <LotteryCard
          title="Win Go"
          description={"Guess Number\nGreen/Red/Violet to win"}
          image={img1}
        />
        <LotteryCard
          title="MotoRace"
          description={"In the competition\nBet on the top three"}
          image={img2}
        />
        <LotteryCard
          title="Disco Number"
          description={"Match the rhythm\nPick your lucky move"}
          image={img3}
        />
        <LotteryCard
          title="BB Bonus"
          description={"Big Bonus game\nHigh risk, high reward"}
          image={img4}
        />
      </div>
    </div>
  );
}

export default LotteryApp;
