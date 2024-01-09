import { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { movieArray } from "./utils/data";
import "./App.css";
import List from "./components/List.jsx";

function App() {
  const [sortedData, setSortedData] = useState([]);
  const [sortByMovie, setSortByMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedGenra, setSelectedGenra] = useState("");

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
    setSortByMovie(
      movieArray?.filter((item) => {
        let lower1 = item?.movie?.toLocaleLowerCase();
        let lower2 = selectedMovie?.toLocaleLowerCase();
        return lower1?.includes(lower2);
      })
    );
  };
  const handleGenraChange = (event) => {
    setSelectedGenra(event.target.value);
  };
  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    setSelectedGenra("");
  };

  useEffect(() => {
    console.log({ sortedData });
    // making rating and category empty on movie Empty
    if (!selectedMovie) {
      console.log("movies:", event.target.value);
      setSelectedRating("");
      setSelectedGenra("");
    }

    // Filter Logic For Movie,Rating and Genra
    if (selectedMovie || selectedRating || selectedGenra) {
      if (selectedMovie) {
        setSortedData(
          movieArray?.filter((item) => {
            let lower1 = item?.movie?.toLocaleLowerCase();
            let lower2 = selectedMovie?.toLocaleLowerCase();
            return lower1?.includes(lower2);
          })
        );
      }
      if (selectedRating) {
        console.log({ selectedRating });
        setSortedData(
          sortByMovie?.filter(
            (item) => Number(item?.rating) == Number(selectedRating)
          )
        );
      }
      if (selectedGenra) {
        setSortedData(
          sortByMovie?.filter((item) => item?.category == selectedGenra)
        );
      }
    } else {
      setSortedData([]);
    }
  }, [selectedMovie, selectedRating, selectedGenra]);

  const rattingStar = useCallback((rating) => {
    let emptyS = Number(Number(10 - rating));
    console.log({ emptyS });
    const str1 = Array(Number(rating)).fill("⭐️").join("");
    const str2 = Array(emptyS).fill("☆").join("");
    // console.log(str1 + str2);
    return str1 + str2;
  }, []);

  return (
    <Container className="app">
      <div className="inputs-div">
        <input
          type="text"
          value={selectedMovie}
          onChange={handleMovieChange}
          placeholder="Enter movie name"
        />
        {/* rating Select */}
        <select value={selectedRating} onChange={handleRatingChange}>
          <option value="">Rating</option>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]?.map(
            (item, i) => (
              <option key={i} value={item}>
                {`${rattingStar(item)}  ${item}`}{" "}
              </option>
            )
          )}
        </select>
        {/* Genra Select */}
        <select value={selectedGenra} onChange={handleGenraChange}>
          <option value="">Any Genra</option>
          {["Action", "Comedy", "Thriller", "Drama"]?.map((item, i) => (
            <option key={i} value={item}>
              {item}{" "}
            </option>
          ))}
        </select>
      </div>
      <div className="grid-container">
        <List sortedData={sortedData} rattingStar={rattingStar} />
        <div></div>
        <div></div>
      </div>
    </Container>
  );
}

export default App;
