import React, { useState } from "react";

export default function QRPayment() {
  const [utr, setUtr] = useState("");
  const account = "sutlsan@sbi";

  const copyAccount = () => {
    navigator.clipboard.writeText(account);
    alert("Account copied!");
  };

  const submitUTR = () => {
    if (utr.length === 12) {
      alert("UTR submitted: " + utr);
    } else {
      alert("Please enter a valid 12-digit UTR.");
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center py-4"
      style={{ fontSize: "14px" , marginBottom:'50px' }}
    >
      {/* Scan QR Section */}
      <h6 className="fw-bold">Scan Code To Pay</h6>
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=sutlsan@sbi"
        alt="QR Code"
        className="my-3"
        style={{ width: "250px", height: "250px" }}
      />
      <p className="text-muted" style={{ fontSize: "12px" }}>
        Do not use same QR code to pay multiple times
      </p>

      <hr className="w-100" />
      <h6 className="fw-bold">QR</h6>

      {/* Copy Account Section */}
      <div
        className="d-flex align-items-center justify-content-between p-2 rounded my-2"
        style={{ backgroundColor: "#e8f9e8", width: "100%", maxWidth: "400px" }}
      >
        <span className="fw-bold me-2">account</span>
        <input
          type="text"
          value={account}
          readOnly
          className="form-control me-2"
        />
        <button className="btn btn-success" onClick={copyAccount}>
          Copy
        </button>
      </div>

      {/* UTR Section */}
      <div
        className="d-flex align-items-center justify-content-between p-2 rounded my-2"
        style={{ backgroundColor: "#e8f9e8", width: "100%", maxWidth: "400px" }}
      >
        <span className="fw-bold me-2">UTR</span>
        <input
          type="text"
          placeholder="input 12-digit here"
          className="form-control me-2"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
        />
        <button className="btn btn-success" onClick={submitUTR}>
          Submit
        </button>
      </div>

      <p className="text-muted small">
        if chip isn't added, input the UTR and click submit.
      </p>

      {/* Contact Section */}
      <div className="mt-4 text-center">
        <a href="mailto:Gopaycomplaintdeal@gmail.com" className="fw-bold">
          Contact us
        </a>
        <ol className="text-start mt-3">
          <li>
            Please, contact us if you have any payment issue: <br />
            <span className="text-primary">Gopaycomplaintdeal@gmail.com</span>
          </li>
          <li>
            Please select the payment method you need and make sure your phone
            has the corresponding wallet software installed.
          </li>
        </ol>
      </div>
    </div>
  );
}
