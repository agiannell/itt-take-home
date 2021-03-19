import { DotLoader } from "react-spinners";

const Loading = () => {
  return (
    <section className="loading-container">
      <DotLoader color="#fff" size="5rem" />
      <h3>Grabbing New Image!</h3>
    </section>
  );
};

export default Loading;
