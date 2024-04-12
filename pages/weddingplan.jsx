import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import { getCityData, getWeatherData } from '../pages/api/weather'; // Import API functions


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

const WeddingPlan = (props) => {
  const router = useRouter();
  const logout = useLogout();
  const [created, setCreated] = useState(false);
  const [noteInfo, setNoteInfo] = useState({});
  const [weddingNotes, setWeddingNotes] = useState([]);
  const [weather, setWeather] = useState(null); // State to store weather data
  const [locationInput, setLocationInput] = useState(''); // State to store user input for location
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeddingNotes();
    const { created, ...info } = router.query;
    if (created) {
      setCreated(true);
      setNoteInfo(info);
    }
  }, [router.query]);

  const fetchWeddingNotes = async () => {
    try {
      const response = await axios.get(`/api/weddingnotes?userId=${props.user._id}`);
      setWeddingNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wedding notes:', error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const cityData = await getCityData(locationInput); // Fetch city data based on location input
      const { lat, lon } = cityData[0];
      const weatherData = await getWeatherData(lat, lon); // Fetch weather data based on coordinates
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = () => {
    fetchWeatherData(locationInput);
  };

  const handleUpdateWeddingNote = (id) => {
    router.push(`/updateplan?id=${id}`);
  };

  const handleDeleteWeddingNote = async (id) => {
    try {
      await axios.delete(`/api/weddingnotes?id=${id}`);
      await fetchWeddingNotes();
    } catch (error) {
      console.error('Error deleting wedding note:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div>
      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />

      <div className={styles.searchContainer}>
        <h1> Check weather of venue: </h1>
        <input
          type="text"
          placeholder="Enter Location (e.g., city, zip code)"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {weather && (
        <div>
              {weather.list[0].weather[0].icon && (
            <img
              src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}.png`}
              alt="Weather Icon"
            />
          )}
          <p>Temperature: {weather.list[0].main.temp}°F</p>
          <p>Weather: {weather.list[0].weather[0].description}</p>
          <p>Feels Like: {weather.list[0].main.feels_like}°F</p>
        </div>
)}
      <div>
      <h1> Your budget: </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          weddingNotes.map((note) => (
            <div key={note._id}>
              <p>Budget: {note.budget}</p>
              <p>Guests: {note.guests}</p>
              <p>Venue: {note.venue}</p>
              <p>Theme: {note.theme}</p>
              <p>Caterers: {note.caterers}</p>
              <p>Alcohol: {note.alcohol}</p>
              <p>Vendors: {note.vendors}</p>
              <p>Rentals: {note.rentals}</p>
              <p>Dress: {note.dress}</p>
              <p>Suit: {note.suit}</p>
              <p>Florals: {note.florals}</p>
              <p>Transportation: {note.transportation}</p>
              <p>Cake: {note.cake}</p>
              <p>Invitations: {note.invitations}</p>
              <p>Decor: {note.decor}</p>
              <p>Bridesmaids: {note.bridesmaids}</p>
              <p>Groomsmen: {note.groomsmen}</p>
              <p>Lodging: {note.lodging}</p>
              <p>Registry: {note.registry}</p>
              <button onClick={() => handleUpdateWeddingNote(note._id)}>Update</button>
              <button onClick={() => handleDeleteWeddingNote(note._id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      <div className={styles.grid}>
        <Link href="/" className={styles.card}>
          <h2>Home &rarr;</h2>
          <p>Return to the homepage.</p>
        </Link>

        <div onClick={handleLogout} style={{ cursor: "pointer" }} className={styles.card}>
          <h2>Logout &rarr;</h2>
          <p>See you later, good job today!</p>
        </div>
      </div>
    </div>
  );
};

export default WeddingPlan;
