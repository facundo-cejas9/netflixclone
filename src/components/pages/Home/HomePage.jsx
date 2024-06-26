import { useEffect, useState } from "react";

import { Navbar } from "../../Navbar/Navbar";
import "./Home.css";
import PlayBtn from "../../../assets/play_icon.png";
import InfoBtn from "../../../assets/info_icon.png";
import { TitleCards } from "../../TitleCards/TitleCards";
import { Footer } from "../../Footer/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import MoviesPage from "../../moviesByGenre/MoviesPage";

export default function HomePage() {
  const [dataMovies, setDataMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGU5OTM0YjAwZWZlNTAxMTI5Yjg0ZWFmYTQ3NDRkZSIsInN1YiI6IjYzNWYwYTBmMzM5NmI5MDA5MWQ3ZjMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T5F-sECLYUrfFckH_F8kyawSJw03RgCJLTycNl5VgVU`,
      },
    };

    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        options
      );
      const data = await response.json();
      setDataMovies(data.results);
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <Slider {...settings}>
          {dataMovies.map((movie) => (
            <div key={movie.id} className="hero-slide">
              <img
                className="banner-img"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="hero-caption">
                <div className="movie-details">
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </div>
                <div className="hero-btns">
                  <Link className="btn" to={`/player/${movie.id}`}>
                    <img src={PlayBtn} alt="PlayButton" />
                    Play
                  </Link>

                  <button className="btn dark-btn">
                    <img src={InfoBtn} alt="InfoButton" />
                    Más Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="more-cards">
        <TitleCards title={"Now playing"} category={"now_playing"} />
        <TitleCards title={"Pronto en Netflix"} category={"upcoming"} />
        <TitleCards title={"Recomendaciones para ti"} category={"top_rated"} />
       
      </div>
      <MoviesPage />
      <Footer />
    </div>
  );
}
