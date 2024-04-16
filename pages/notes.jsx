import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
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

const WeddingNotesPage = (props) => {
  const router = useRouter();
  const logout = useLogout();
  const [hasNote, setHasNote] = useState(false)

  // useState variables for wedding note fields
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  const [guests, setGuests] = useState('');
  const [venue, setVenue] = useState('');
  const [theme, setTheme] = useState('');
  const [caterers, setCaterers] = useState('');
  const [alcohol, setAlcohol] = useState('');
  const [vendors, setVendors] = useState('');
  const [rentals, setRentals] = useState('');
  const [dress, setDress] = useState('');
  const [suit, setSuit] = useState('');
  const [florals, setFlorals] = useState('');
  const [transportation, setTransportation] = useState('');
  const [cake, setCake] = useState('');
  const [invitations, setInvitations] = useState('');
  const [decor, setDecor] = useState('');
  const [bridesmaids, setBridesmaids] = useState('');
  const [groomsmen, setGroomsmen] = useState('');
  const [lodging, setLodging] = useState('');
  const [registry, setRegistry] = useState('');
  const [music, setMusic] = useState('');
  const [photographer, setPhotographer] = useState('');
  const [weddingNotes, setWeddingNotes] = useState([]);

  // Fetch data from the backend API
  const fetchWeddingNotes = async () => {
    try {
      const response = await axios.get(`/api/weddingnotes?userId=${props.user._id}`);
      if (response.data.length > 0) 
        setHasNote(true);
    } catch (error) {
      console.error('Error fetching wedding notes:', error);
    }
  };

  // New wedding note function
  const handleCreateWeddingNote = async () => {

    const { user } = props; // Destructure the user object from props
    const { _id: userId } = user; // Extract the userID from the user object because we need userId for CRUD

    try {
      await axios.post('/api/weddingnotes', {
        userId,
        date,
        budget,
        guests,
        venue,
        theme,
        caterers,
        alcohol,
        vendors,
        rentals,
        dress,
        suit,
        florals,
        transportation,
        cake,
        invitations,
        decor,
        bridesmaids,
        groomsmen,
        lodging,
        registry,
        music,
        photographer});
      await fetchWeddingNotes();
      setDate('');
      setBudget('');
      setGuests('');
      setVenue('');
      setTheme('');
      setCaterers('');
      setAlcohol('');
      setVendors('');
      setRentals('');
      setDress('');
      setSuit('');
      setFlorals('');
      setTransportation('');
      setCake('');
      setInvitations('');
      setDecor('');
      setBridesmaids('');
      setGroomsmen('');
      setLodging('');
      setRegistry('');
      setMusic('');
      setPhotographer ('')

      alert('Wedding note has been created!');

      router.push({
        pathname: '/weddingplan',
        query: { created: true,
        userId,
        date,
        budget,
        guests,
        venue,
        theme,
        caterers,
        alcohol,
        vendors,
        rentals,
        dress,
        suit,
        florals,
        transportation,
        cake,
        invitations,
        decor,
        bridesmaids,
        groomsmen,
        lodging,
        registry,
        music,
        photographer
        }
      })
    } catch (error) {
      console.error('Error creating wedding note:', error);
    }
  };

  useEffect(() => {
    fetchWeddingNotes();
  }, [userId]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className={styles.notesbackground}>
      <Head>
        <title> Create your vision!!</title>
        <meta name="description" content="create your wedding vision and fill out the fields!" />
        <html lang="en" />
      </Head>
      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />

      <div>
        <h1 className={styles.formTitle}>Create Your Wedding Vision</h1>
        <form onSubmit={handleCreateWeddingNote} className={styles.planForm}>
          <textarea placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Guests" value={guests} onChange={(e) => setGuests(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)}  className={styles.formInput}></textarea>
          <textarea placeholder="Theme" value={theme} onChange={(e) => setTheme(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Caterers" value={caterers} onChange={(e) => setCaterers(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Alcohol" value={alcohol} onChange={(e) => setAlcohol(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Vendors" value={vendors} onChange={(e) => setVendors(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Rentals" value={rentals} onChange={(e) => setRentals(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Dress" value={dress} onChange={(e) => setDress(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Suit" value={suit} onChange={(e) => setSuit(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Florals" value={florals} onChange={(e) => setFlorals(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Transportation" value={transportation} onChange={(e) => setTransportation(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Cake" value={cake} onChange={(e) => setCake(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Invitations" value={invitations} onChange={(e) => setInvitations(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Decor" value={decor} onChange={(e) => setDecor(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Bridesmaids" value={bridesmaids} onChange={(e) => setBridesmaids(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Groomsmen" value={groomsmen} onChange={(e) => setGroomsmen(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Lodging" value={lodging} onChange={(e) => setLodging(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Music" value={music} onChange={(e) => setMusic(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Photographer" value={photographer} onChange={(e) => setPhotographer(e.target.value)} className={styles.formInput}></textarea>
          <textarea placeholder="Registry" value={registry} onChange={(e) => setRegistry(e.target.value)} className={styles.formInput}></textarea>
          <button type="submit" className={styles.submitButton} onClick={() => { window.location.href = '/weddingplan'; }}>Create Wedding Note</button>
        </form>
    <div>
  {weddingNotes.map((note) => (
    <div key={note._id}>
      <p>User ID: {note.userId}</p>
      <p> Date: {note.date}</p>
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
      <p>Music: {note.music}</p>
      <p>Photographer: {note.photographer}</p>
      <p>Registry: {note.registry}</p>

      <button onClick={() => handleUpdateWeddingNote(note._id)}>Update</button>
      <button onClick={() => handleDeleteWeddingNote(note._id)}>Delete</button>
    </div>
  ))}
        </div>
      </div>
      <div className={styles.grid}>
        <Link href="/" class="btn btn-warning btn-lg">
          <h2>Home &rarr;</h2>
        </Link>

        <Link href="/weddingplan" class="btn btn-info btn-lg">
          <h2>Current Plan &rarr;</h2>
        </Link>

        <div onClick={handleLogout} style={{ cursor: "pointer" }} class="btn btn-danger btn-lg">
          <h2>Logout &rarr;</h2>
        </div>
      </div>
    </div>
  );
};

export default WeddingNotesPage;




