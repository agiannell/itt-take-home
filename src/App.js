import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "./Components/Loading";
import Quote from "./Components/Quote";
import LiveClock from "./Components/LiveClock";
import Weather from "./Components/Weather";
import "./styles/App.css";

const App = () => {
  const [image, setImage] = useState(null),
    [isLoading, setIsLoading] = useState(true),
    isMounted = useRef(true);

  const getImage = () => {
    setIsLoading(true);
    axios
      .get("/api/image")
      .then((res) => {
        if (isMounted.current) {
          setImage(res.data.url);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getImage();

    return () => (isMounted.current = false);
  }, []);

  return (
    <section>
      {isLoading ? <Loading /> : null}
      <section
        className="app-container"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(220,220,221,.8), rgba(25,133,161,.5)), url(${image})`,
        }}
      >
        <Quote />
        <LiveClock />
        <Weather />
        <button onClick={getImage}>Get New Image</button>
      </section>
    </section>
  );
};

export default App;
