import { React, useState, useEffect, useRef } from "react";
import "../Component/preview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeftLong,
  faPenToSquare,
  faUser,
  faEllipsisVertical,
  faPaperclip,
  faPaperPlane,
  faCamera,
  faVideo,
  faFileArrowDown,
  faPhone,
  faCommentSlash
} from "@fortawesome/free-solid-svg-icons";

const Preview = () => {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [toggle, setToggle] = useState(false);

  const chatContainerRef = useRef(null);

  const handleToggleClick = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // api call
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://qa.corider.in/assignment/chat?page=0"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // message threshold and fetch back
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    
    const threshold = 100;

    if (scrollTop < threshold) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      fetchData();
    }
  };

  // scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageNumber]);

  return (
    <div className="chat-screen">
      {/* Header */}
      <div>
        {/* Header 1*/}
        <div className="header">
          <div className="flex">
            <div className="back-button">
              <FontAwesomeIcon className="icon-2" icon={faLeftLong} />
            </div>
            <div className="group-info">
              <h1>Trip 1</h1>
            </div>
          </div>
          <div className="share-button">
            <FontAwesomeIcon className="icon-2" icon={faPenToSquare} />
          </div>
        </div>

        {/* Header 2*/}
        <div className="header header-2">
          <div className="flex">
            <div className="group-image">
              <FontAwesomeIcon className="icon" icon={faUser} />
            </div>
            <div className="group-info">
              <div>
                <p className="head-span">From </p>
                <h3>IGI Airport, T3</h3>
                <br />
                <p className="head-span">To </p>
                <h3>Sector 28</h3>
              </div>
            </div>
          </div>
          <div className="share-button">
            <FontAwesomeIcon
              className="icon-2"
              icon={faEllipsisVertical}
            />
          </div>
        </div>
      </div>

      {/* Border */}
      <div className="border" />

      {/* Message Display Area */}
      <div className="message-display">
        {data ? (
          <ul>
            {/* Date */}
            <div className="header">
              <div className="border-date" />
              <div className="date-text">12 JAN, 2023</div>
              <div className="border-date" />
            </div>

            {/* chat display */}
            {data.chats.map((item) => (
              <div key={item.id} className="chat-display">
                {/* image */}
                <img
                  src={item.sender.image}
                  className={`${
                    item.sender.self == true ? "none-image" : "chat-image"
                  }`}
                />

                {/* text */}
                <p
                  className={`${
                    item.sender.self == true ? "my-message" : "other-message"
                  }`}
                >
                  {item.message}
                </p>
              </div>
            ))}
          </ul>
        ) : (
          <p>Syncing...</p>
        )}
      </div>

      {/* Reply Text Area */}
      <div className="reply-area">
        <input type="text" placeholder="Reply to @Rohit Yadav" />
        <FontAwesomeIcon
          className="input-button attach-button"
          icon={faPaperclip}
          onClick={handleToggleClick}
        />

        {/* cam/vid/doc toggle */}
        <div className={`${toggle == true ? "click-icons" : "none-icon"}`}>
          <FontAwesomeIcon className="icon-3" icon={faCamera} />
          <FontAwesomeIcon className="icon-3" icon={faVideo} />
          <FontAwesomeIcon className="icon-3" icon={faFileArrowDown} />
          <div className="arrow" />
        </div>

        <FontAwesomeIcon
          className="input-button send-button"
          icon={faPaperPlane}
        />
      </div>
    </div>
  );
};

export default Preview;
