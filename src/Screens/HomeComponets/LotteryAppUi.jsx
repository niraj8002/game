import React from "react";
import img1 from "../../assets/lttboll.png";
import img2 from "../../assets/lttmoto.png";
import img3 from "../../assets/lttdis.png";
import img4 from "../../assets/lttbb.png";

// Single card component
const LotteryCard = ({ title, description, image }) => {
  return (
    <div className="bg-gradient-to-br from-[#FBE29C] to-[#F6C444] text-black rounded-xl  flex items-center justify-between shadow-md hover:scale-[1.02] transition-transform duration-200">
      <div className="px-2">
        <h3 className="font-bold text-md">{title}</h3>
        {/* Display multi-line description correctly */}
        <p className="text-sm font-medium truncate" >{description}</p>
      </div>
      <img src={image} alt={title} className="w-20  object-cover" />
    </div>
  );
};

// Main component
function LotteryApp() {
  return (
    <div className="bg-[#1f1f1f] text-white flex flex-col items-center px-3 py-2 ">
      <h2 className="text-lg font-bold text-yellow-400 w-full text-left mt-2">
        Lottery
      </h2>

      <div className="space-y-2 w-full ">
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
