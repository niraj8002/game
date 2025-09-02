import React from "react";
import { Clipboard,
  ClipboardCheck,
  Calendar2Check,
  CurrencyDollar,
  JournalText,
  ChatDots,
  Percent,
  ChevronRight, } from "react-bootstrap-icons"; // copy icon
import { QrCode } from "react-bootstrap-icons"; // qr code icon

export default function Agency() {
  const invitationCode = "5824511403793";

  const copyCode = () => {
    navigator.clipboard.writeText(invitationCode);
    alert("Invitation code copied!");
  };

  return (
    <div className="d-flex flex-column vh-100 bg-dark text-light">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between border-bottom border-secondary p-3">
        <h5 className="mb-0 text-white flex-grow-1 text-center">Agency</h5>
        <QrCode className="text-warning fs-4" />
      </div>

      {/* Commission Section */}
      <div className="text-center p-4" style={{ background: "linear-gradient(to bottom, #f6d365, #fda085)" }}>
        <h2 className="mb-2 text-dark">0</h2>
        <button className="btn btn-dark rounded-pill px-4 py-1 mb-2">
          Yesterday's total commission
        </button>
        <p className="text-dark mb-0">Upgrade the level to increase commission income</p>
      </div>

      {/* Subordinates Section */}
      <div className="bg-dark text-white mt-3 p-3">
        <div className="d-flex bg-secondary rounded shadow-sm overflow-hidden">
          {/* Direct Subordinates */}
          <div className="flex-fill p-3 text-center border-end border-dark">
            <div className="fw-bold mb-2">
              <i className="bi bi-person-fill me-2 text-warning"></i>
              Direct subordinates
            </div>
            <p className="mb-1">0</p>
            <p className="mb-1 small">number of register</p>
            <p className="mb-1 text-success">0</p>
            <p className="mb-1 small">Deposit number</p>
            <p className="mb-1 text-warning">0</p>
            <p className="mb-1 small">Deposit amount</p>
            <p className="mb-1">0</p>
            <p className="small">Number of people making first deposit</p>
          </div>

          {/* Team Subordinates */}
          <div className="flex-fill p-3 text-center">
            <div className="fw-bold mb-2">
              <i className="bi bi-people-fill me-2 text-warning"></i>
              Team subordinates
            </div>
            <p className="mb-1">0</p>
            <p className="mb-1 small">number of register</p>
            <p className="mb-1 text-success">0</p>
            <p className="mb-1 small">Deposit number</p>
            <p className="mb-1 text-warning">0</p>
            <p className="mb-1 small">Deposit amount</p>
            <p className="mb-1">0</p>
            <p className="small">Number of people making first deposit</p>
          </div>
        </div>
      </div>

      {/* Download QR Code Button */}
      <div className="p-3">
        <button
          className="btn w-100 fw-bold"
          style={{
            background: "linear-gradient(to right, #f6d365, #fda085)",
            color: "black",
            borderRadius: "12px",
          }}
        >
          Download QR Code
        </button>
      </div>

      {/* Invitation Code */}
      <div className="pl-3 pr-3">
        <div className="bg-secondary rounded p-3 d-flex justify-content-between align-items-center">
          <div className="fw-bold">
            <ClipboardCheck className="me-2 text-warning" />
            Copy invitation code
          </div>
          <div className="d-flex align-items-center">
            <span className="me-2 fw-bold">{invitationCode}</span>
            <button
              className="btn btn-link text-warning p-0"
              onClick={copyCode}
            >
              <Clipboard />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-3 pt-0 d-flex flex-column vh-100 bg-dark text-light">
        {/* Subordinate Data */}
        <div className="bg-secondary rounded p-3 mb-3 d-flex justify-content-between align-items-center">
          <div>
            <Calendar2Check className="me-2 text-warning" />
            Subordinate data
          </div>
          <ChevronRight className="text-light" />
        </div>

        {/* Commission Detail */}
        <div className="bg-secondary rounded p-3 mb-3 d-flex justify-content-between align-items-center">
          <div>
            <CurrencyDollar className="me-2 text-warning" />
            Commission detail
          </div>
          <ChevronRight className="text-light" />
        </div>

        {/* Invitation Rules */}
        <div className="bg-secondary rounded p-3 mb-3 d-flex justify-content-between align-items-center">
          <div>
            <JournalText className="me-2 text-warning" />
            Invitation rules
          </div>
          <ChevronRight className="text-light" />
        </div>

        {/* Agent Line Customer Service */}
        <div className="bg-secondary rounded p-3 mb-3 d-flex justify-content-between align-items-center">
          <div>
            <ChatDots className="me-2 text-warning" />
            Agent line customer service
          </div>
          <ChevronRight className="text-light" />
        </div>

        {/* Rebate Ratio */}
        <div className="bg-secondary rounded p-3 mb-3 d-flex justify-content-between align-items-center">
          <div>
            <Percent className="me-2 text-warning" />
            Rebate ratio
          </div>
          <ChevronRight className="text-light" />
        </div>

        {/* Promotion Data */}
        <div className="bg-secondary rounded p-3 mt-4">
          <div className="fw-bold mb-3 text-warning">
            <ClipboardCheck className="me-2" />
            promotion data
          </div>
          <div className="row text-center">
            <div className="col-6 border-end border-dark">
              <p className="fw-bold mb-1">0</p>
              <p className="mb-1">This Week</p>
              <p className="fw-bold mb-1">0</p>
              <p className="mb-0">direct subordinate</p>
            </div>
            <div className="col-6">
              <p className="fw-bold mb-1">0</p>
              <p className="mb-1">Total commission</p>
              <p className="fw-bold mb-1">0</p>
              <p className="mb-0">Total number of subordinates in the team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
