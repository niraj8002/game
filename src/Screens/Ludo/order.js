

import React from 'react'
import { useNavigate } from 'react-router-dom';


const Order = (props) => {
    let navigate = useNavigate();

    const onBack = (e) => {
        console.log("dfghjk")
        navigate(`${e}`)
    }
  return (
 
     <div className='japurLudoNav realludokingsize'>
          <div className='container'>

<div class="row nav-top auto">
    <div class="col-2 xtl">
          <span class=" " style={{ fontSize: '40px', fontWeight: 'normal' }} onClick={() => onBack('/')}>&#x2039;</span>

        </div>
<div class="col-8 tfw-5 tf-18 text-center">Order</div>
<div class="col-2"></div>
<div class="col-12 pa-0 odtnav dflxsbt">

    <ul class="nav nav-tabs">
  <li ><a class="xtab active" data-toggle="tab" href="#menu1">FastParity</a></li>
  <li><a class="xtab" data-toggle="tab" href="#menu2">Parity</a></li>
</ul>
    </div></div>



<div class="tab-content bg-white">

  <div id="menu1" class="tab-pane active">
  <div class="row"><div class="col-12 bg-white" id="dtaod">
<div class="row tf-14 rbs mb-2 mt-2 myma">
	<div class="col-6 pb-2 tf-16 xtl">202407041</div>
	<div class="col-6 pb-2 xtr">04/07 00:00:30</div>
	<div class="col-3 pb-2 xtl">Select</div>
	<div class="col-2 pb-2">Point</div>
	<div class="col-2 pb-2">Result</div>
	<div class="col-5 pb-2 xtr">Amount</div>
	<div class="col-3 xtl"><span class="GS grvrb">1</span></div>
	<div class="col-2">10.00</div>
	<div class="col-2"><div class="GS"><div class=""></div><div class="tpr">8</div></div></div>
	<div class="col-5 xtr tf-20 tfw-6 tffm"><r>-₹1.80</r></div>
	<div class="col-12 pt-2">
		<div class="row pt-2 rbt1ps">
			<div class="col-6 xtl">Delivery: ₹88.20</div>
			<div class="col-6 xtr">Fee: ₹0.20</div>
		</div>
	</div>
</div>
<div class="row tf-14 rbs mb-2 mt-2 myma">
	<div class="col-6 pb-2 tf-16 xtl">202407041393</div>
	<div class="col-6 pb-2 xtr">09/09 00:00:30</div>
	<div class="col-3 pb-2 xtl">Select</div>
	<div class="col-2 pb-2">Point</div>
	<div class="col-2 pb-2">Result</div>
	<div class="col-5 pb-2 xtr">Amount</div>
	<div class="col-3 xtl"><span class="GS grvrb">1</span></div>
	<div class="col-2">10.00</div>
	<div class="col-2"><div class="GS"><div class=""></div><div class="tpr">9</div></div></div>
	<div class="col-5 xtr tf-20 tfw-6 tffm"><r>-₹1.80</r></div>
	<div class="col-12 pt-2">
		<div class="row pt-2 rbt1ps">
			<div class="col-6 xtl">Delivery: ₹96.20</div>
			<div class="col-6 xtr">Fee: ₹0.20</div>
		</div>
	</div>
</div></div></div>
  </div>
  <div id="menu2" class="tab-pane fade">

  <div class="row"><div class="col-12 bg-white" id="dtaod">
<div class="row tf-14 rbs mb-2 mt-2 myma">
	<div class="col-6 pb-2 tf-16 xtl">202407041</div>
	<div class="col-6 pb-2 xtr">04/07 00:00:30</div>
	<div class="col-3 pb-2 xtl">Select</div>
	<div class="col-2 pb-2">Point</div>
	<div class="col-2 pb-2">Result</div>
	<div class="col-5 pb-2 xtr">Amount</div>
	<div class="col-3 xtl"><span class="GS grvrb">1</span></div>
	<div class="col-2">10.00</div>
	<div class="col-2"><div class="GS"><div class=""></div><div class="tpr">8</div></div></div>
	<div class="col-5 xtr tf-20 tfw-6 tffm"><r>-₹1.80</r></div>
	<div class="col-12 pt-2">
		<div class="row pt-2 rbt1ps">
			<div class="col-6 xtl">Delivery: ₹88.20</div>
			<div class="col-6 xtr">Fee: ₹0.20</div>
		</div>
	</div>
</div>
<div class="row tf-14 rbs mb-2 mt-2 myma">
	<div class="col-6 pb-2 tf-16 xtl">202407041393</div>
	<div class="col-6 pb-2 xtr">09/09 00:00:30</div>
	<div class="col-3 pb-2 xtl">Select</div>
	<div class="col-2 pb-2">Point</div>
	<div class="col-2 pb-2">Result</div>
	<div class="col-5 pb-2 xtr">Amount</div>
	<div class="col-3 xtl"><span class="GS grvrb">1</span></div>
	<div class="col-2">10.00</div>
	<div class="col-2"><div class="GS"><div class=""></div><div class="tpr">9</div></div></div>
	<div class="col-5 xtr tf-20 tfw-6 tffm"><r>-₹1.80</r></div>
	<div class="col-12 pt-2">
		<div class="row pt-2 rbt1ps">
			<div class="col-6 xtl">Delivery: ₹96.20</div>
			<div class="col-6 xtr">Fee: ₹0.20</div>
		</div>
	</div>
</div></div></div>
  </div>
</div>

    </div>
   </div>
   
  )
}

export default Order
