import { useNavigate } from "react-router-dom";
import "./Home.css";
import Button from "../../components/ui/Button/Button";
export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/battle");
  };

  return (
    <>
      <section className="home">
        <img src="public/assets/images/pokeball.png" alt="Pokemon Logo" />
        <h1 id="home-title">Welcome to PokéDuel</h1>
        <h3 id="home-subtitle">Discover who has the type advantage.</h3>
        <img
          className="arrow-down"
          src="public/assets/icons/arrow-sm-down-svgrepo-com.svg"
          alt="arrow down"
        />
        <Button onClick={handleClick}>Start Duelling</Button>
      </section>
    </>
  );
}
