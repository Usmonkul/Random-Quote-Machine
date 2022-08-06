import React, { useEffect, useState } from "react";
import "./Quote.css";
import tachyons from "tachyons";

export default function Quote(props) {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [rdcolor, setRdcolor] = useState("#16a085");
  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];
  const getRandomColor = () => {
    let randomIndex = Math.floor(Math.random() * colors.length);
    setRdcolor(colors[randomIndex]);
  };
  const getQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      if (response.ok) {
        const jsonResponse = await response.json();
        let randomNumber = Math.floor(Math.random() * jsonResponse.length);
        setQuote(jsonResponse[randomNumber].text);
        setAuthor(jsonResponse[randomNumber].author);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuote();
  }, []);
  const newQuote = () => {
    getQuote();
    getRandomColor();
  };
  return (
    <div className="container" style={{ backgroundColor: rdcolor }}>
      <div id="quote-box">
        <div className="quote-text tc mb4" style={{ color: rdcolor }}>
          <i className="fa fa-quote-left"> </i>
          <p className="f3" id="text">
            {quote}
          </p>
        </div>
        <div className="quote-author tr mb4" style={{ color: rdcolor }}>
          - <span id="author">{author}</span>
        </div>
        <div className="buttons">
          <a
            id="tweet-quote"
            title="Tweet this quote!"
            href="#https://"
            className="button mr2"
            target="_blank"
            style={{ backgroundColor: rdcolor }}
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
            id="tumblr-quote"
            title="Post this quote on tumblr!"
            href="#https://"
            className="button"
            target="_blank"
            style={{ backgroundColor: rdcolor }}
          >
            <i className="fa fa-tumblr"></i>
          </a>
          <button
            id="new-quote"
            className="button"
            onClick={newQuote}
            style={{ backgroundColor: rdcolor }}
          >
            New quote
          </button>
        </div>
      </div>
      <span className="madeby mt2 f6">by Usmon</span>
    </div>
  );
}
