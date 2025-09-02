import React, { useContext } from "react";
import img1 from "../../assets/lttboll.png";
import img2 from "../../assets/lttmoto.png";
import img3 from "../../assets/lttdis.png";
import img4 from "../../assets/lttbb.png";
import { UserContext } from "../../globalContext";
import { useNavigate } from "react-router-dom";

// Single card component
const LotteryCard = ({ title, description, image }) => {
  const user = useContext(UserContext);
    let navigate = useNavigate();
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
   const user = useContext(UserContext);
    let navigate = useNavigate();
  return (
    <div className="bg-[#1f1f1f] text-white flex flex-col items-center px-3 py-2 ">
      <h2 className="text-lg font-bold text-yellow-400 w-full text-left mt-2">
        Lottery
      </h2>

      <div className="space-y-2 w-full " >
        <div onClick={()=>{navigate('/Activity')}}>
           <LotteryCard 
          title="Win Go"
          
          description={ <small>
      Guess Number <br />
      Green/Red/Violet to win
    </small>}
          image={img1}
          
        />
        </div>
       
        <LotteryCard
          title="MotoRace"
          description={<small>In the competition <br/>Bet on the top three</small>}
          image={img2}
        />
        <LotteryCard
          title="Disco Number"
          description={<small>Match the rhythm <br/>Pick your lucky move</small>}
          image={img3}
        />
        <LotteryCard
          title="BB Bonus"
          description={<small>Big Bonus game <br/>High risk, high reward</small>}
          image={img4}
        />
      </div>
    </div>
  );
}

export default LotteryApp;
