import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import { getCityData, getWeatherData } from '../pages/api/weather';
import Head from 'next/head'


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
    <div className={styles.planningpage}>
      <Head>
        <title> View your plan</title>
        <meta name="description" content="This is your current wedding plan, or plans, and you can update or delete them!" />
      </Head>
      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />
    <div className={styles.searchWrapper}>
      <div className={styles.searchContainer}>
        <div> 
          <h3> Check weather of venue: </h3>
          <input
            type="text"
            placeholder="Enter Location (e.g., city, zip code)"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            className={styles.weatherinput}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {weather && (
          <div className={styles.weatherResult}>
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
        </div>
      <div className={styles.weddingVissions}>

        {loading ? (
          <p>Loading...</p>
        ) : (
          weddingNotes.map((note) => (
            <div key={note._id} className={styles.noteDetailsWrapper}>
              <p className={styles.noteDetails}>Date of this note: {note.date}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Budget: {note.budget}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Guests: {note.guests}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Venue: {note.venue}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Theme: {note.theme}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Caterers: {note.caterers}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Alcohol: {note.alcohol}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Vendors: {note.vendors}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Rentals: {note.rentals}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Dress: {note.dress}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Suit: {note.suit}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Florals: {note.florals}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Transportation: {note.transportation}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Cake: {note.cake}</p>
              <p className={styles.noteDetails}>Invitations: {note.invitations}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Decor: {note.decor}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Bridesmaids: {note.bridesmaids}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Groomsmen: {note.groomsmen}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Lodging: {note.lodging}</p>
              <hr class="my-2"/>
              <p className={styles.noteDetails}>Registry: {note.registry}</p>
              <button onClick={() => handleUpdateWeddingNote(note._id)} class="btn btn-success btn-lg mb-2">Update</button>
              <button onClick={() => handleDeleteWeddingNote(note._id)} class="btn btn-info btn-lg mt-2">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
      <div className={styles.grid}>
        <Link href="/" class="btn btn-warning btn-lg">
          <h2>Home &rarr;</h2>
        </Link>
        <div onClick={handleLogout} style={{ cursor: "pointer" }} class="btn btn-danger btn-lg">
          <h2>Logout &rarr;</h2>
        </div>
      </div>
    </div>
  );
};

export default WeddingPlan;
