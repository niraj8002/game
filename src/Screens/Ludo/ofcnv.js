import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OffcanvasComponent = () => {
  const navLinkRef = useRef(null);
  const [countdown, setCountdown] = useState(10); // 10 seconds countdown

  useEffect(() => {
    const navLink = navLinkRef.current;

    const handleLinkClick = () => {
      if (navLink.classList.contains('show')) {
        navLink.classList.remove('show');
      }
    };

    if (navLink) {
      navLink.addEventListener('click', handleLinkClick);
    }

    return () => {
      if (navLink) {
        navLink.removeEventListener('click', handleLinkClick);
      }
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      const offcanvasElement = document.getElementById('offcanvasRight');
      if (offcanvasElement && offcanvasElement.classList.contains('show')) {
        offcanvasElement.classList.remove('show');
      }
    }
  }, [countdown]);

  return (
    <div>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Open Offcanvas
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        ref={navLinkRef}
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Offcanvas</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <a href="#" className="d-block mb-2">Link 1</a>
          <a href="#" className="d-block mb-2">Link 2</a>
          <a href="#" className="d-block mb-2">Link 3</a>
        </div>
        <div className="offcanvas-footer">
          <p>Closing in {countdown} seconds...</p>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasComponent;
