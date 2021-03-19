import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Quote = (props) => {
  const [quote, setQuote] = useState(null),
    [isHovered, setIsHovered] = useState(false),
    isMounted = useRef(true);

  const getQuote = () => {
    axios
      .get("/api/quote")
      .then((res) => {
        if (isMounted.current) {
          setQuote({
            content: res.data.content.rendered,
            author: res.data.title.rendered,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuote();

    return () => (isMounted.current = false);
  }, []);

  return (
    <section
      className="quote-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p>{quote?.content.replace(/<\/?[^>]+(>|$)|&#8217;/g, "'")}</p>
      <section className="quote-footer">
        <h4 className={isHovered ? null : "hidden"}>-{quote?.author}</h4>
        <span onClick={getQuote}>New Quote</span>
      </section>
    </section>
  );
};

export default Quote;
