import React, { useContext,useEffect,useState } from "react";
import { UserContext } from "../../globalContext";
import { useNavigate } from "react-router-dom";

const Guide = (props) => {


  const user = useContext(UserContext);
  let navigate = useNavigate();


  return (
   <div > 
    <div role="dialog" aria-modal="true" class="h-100 offcanvas  show" tabindex="-1"><div class="offcanvas-header"><div class="offcanvas-title h5">How To Play Games &amp; Earn?</div><button type="button" class="btn-close" aria-label="Close"></button></div><div class="offcanvas-body"><div ></div></div></div>
 </div>
     );
};

export default Guide;

