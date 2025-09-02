import { useState } from "react";
import { Trash } from "react-bootstrap-icons"; // bootstrap icons

export default function Notification() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "LOGIN JANKAARI",
      time: "2025-09-01 14:01:49",
      message:
        "Aapka khaata abhi-abhi 2025-09-01 14:01:49 par login kiya gaya hai. Yadi aapke koi prashn hain, To krpya puch taash ke liye online graahak seva se sampark karen! Main aapke liye sukhad gaming aur dher saare munaafe kee kaamana karata hoon!",
    },
    {
      id: 2,
      title: "LOGIN JANKAARI",
      time: "2025-09-01 11:48:35",
      message:
        "Aapka khaata abhi-abhi 2025-09-01 11:48:35 par login kiya gaya hai. Yadi aapke koi prashn hain, To krpya puch taash ke liye online graahak seva se sampark karen! Main aapke liye sukhad gaming aur dher saare munaafe kee kaamana karata hoon!",
    },
    {
      id: 3,
      title: "LOGIN JANKAARI",
      time: "2025-09-01 09:31:15",
      message:
        "Aapka khaata abhi-abhi 2025-09-01 09:31:15 par login kiya gaya hai. Yadi aapke koi prashn hain, To krpya puch taash ke liye online graahak seva se sampark karen! Main aapke liye sukhad gaming aur dher saare munaafe kee kaamana karata hoon!",
    },
    {
      id: 4,
      title: "LOGIN JANKAARI",
      time: "2025-09-01 00:35:48",
      message:
        "Aapka khaata abhi-abhi 2025-09-01 00:35:48 par login kiya gaya hai. Yadi aapke koi prashn hain, To krpya puch taash ke liye online graahak seva se sampark karen! Main aapke liye sukhad gaming aur dher saare munaafe kee kaamana karata hoon!",
    },
  ]);

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="d-flex flex-column vh-100 bg-dark text-light">
      {/* Header */}
      <div
        className="d-flex align-items-center border-bottom border-secondary p-3"
        onClick={() => {
          window.location.href = "/HomeScreen";
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={"22px"}
          style={{ fill: "white" }}
          viewBox="0 0 640 640"
        >
          <path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" />
        </svg>
        <h5
          className="mb-0 flex-grow-1 text-center text-white fw-bold"
          style={{ fontSize: "14px" }}
        >
          Notification
        </h5>
      </div>

      {/* Notification List */}
      <div className="flex-grow-1 overflow-auto p-3">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="bg-secondary rounded p-3 mb-3 shadow-sm border border-dark"
            style={{ fontSize: "14px" }} // 👈 All text 14px
          >
            {/* Title Row */}
            <div className="d-flex justify-content-between align-items-center">
              <div className="fw-bold" style={{ fontSize: "14px" }}>
                <i className="bi bi-envelope me-2"></i>
                {note.title}
              </div>
              <button
                onClick={() => deleteNotification(note.id)}
                className="btn btn-link text-warning p-0"
              >
                <Trash />
              </button>
            </div>

            {/* Time */}
            <div className="text-muted mt-1" style={{ fontSize: "14px" }}>
              {note.time}
            </div>

            {/* Message */}
            <p className="mt-2 mb-0" style={{ fontSize: "14px" }}>
              {note.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
