import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";

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

  // useState variables for wedding note fields
  const [userId, setUserId] = useState('');
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
  const [weddingNotes, setWeddingNotes] = useState([]);

  // Fetch data from the backend API
  const fetchWeddingNotes = async () => {
    try {
      const response = await axios.get(`/api/weddingnotes?userId=${userId}`);
      setWeddingNotes(response.data);
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
        registry});
      await fetchWeddingNotes();
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

      alert('Wedding note has been created!');
    } catch (error) {
      console.error('Error creating wedding note:', error);
    }
  };

  // Updating a wedding note function
  const handleUpdateWeddingNote = async (id) => {
    const { user } = props; // Destructure the user object from props
    const { _id: userId } = user; // Extract the userID from the user object because we need userId for CRUD
    try {
      await axios.put(`/api/weddingnotes?id=${id}`, 
      {
        userId,
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
        registry});
      await fetchWeddingNotes();
    } catch (error) {
      console.error('Error updating wedding note:', error);
    }
  };

  // Deleting a wedding note function
  const handleDeleteWeddingNote = async (id) => {
    try {
      await axios.delete(`/api/weddingnotes?id=${id}`);
      await fetchWeddingNotes();
    } catch (error) {
      console.error('Error deleting wedding note:', error);
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
    <div>
      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />

      <div>
        <form onSubmit={handleCreateWeddingNote}>
            <input type="text" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
            <input type="text" placeholder="Guests" value={guests} onChange={(e) => setGuests(e.target.value)} />
            <input type="text" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
            <input type="text" placeholder="Theme" value={theme} onChange={(e) => setTheme(e.target.value)} />
            <input type="text" placeholder="Caterers" value={caterers} onChange={(e) => setCaterers(e.target.value)} />
            <input type="text" placeholder="Alcohol" value={alcohol} onChange={(e) => setAlcohol(e.target.value)} />
            <input type="text" placeholder="Vendors" value={vendors} onChange={(e) => setVendors(e.target.value)} />
            <input type="text" placeholder="Rentals" value={rentals} onChange={(e) => setRentals(e.target.value)} />
            <input type="text" placeholder="Dress" value={dress} onChange={(e) => setDress(e.target.value)} />
            <input type="text" placeholder="Suit" value={suit} onChange={(e) => setSuit(e.target.value)} />
            <input type="text" placeholder="Florals" value={florals} onChange={(e) => setFlorals(e.target.value)} />
            <input type="text" placeholder="Transportation" value={transportation} onChange={(e) => setTransportation(e.target.value)} />
            <input type="text" placeholder="Cake" value={cake} onChange={(e) => setCake(e.target.value)} />
            <input type="text" placeholder="Invitations" value={invitations} onChange={(e) => setInvitations(e.target.value)} />
            <input type="text" placeholder="Decor" value={decor} onChange={(e) => setDecor(e.target.value)} />
            <input type="text" placeholder="Bridesmaids" value={bridesmaids} onChange={(e) => setBridesmaids(e.target.value)} />
            <input type="text" placeholder="Groomsmen" value={groomsmen} onChange={(e) => setGroomsmen(e.target.value)} />
            <input type="text" placeholder="Lodging" value={lodging} onChange={(e) => setLodging(e.target.value)} />
            <input type="text" placeholder="Registry" value={registry} onChange={(e) => setRegistry(e.target.value)} />
          <button type="submit">Create Wedding Note</button>
        </form>

    <div>
  {weddingNotes.map((note) => (
    <div key={note._id}>
      <p>User ID: {note.userId}</p>
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
  ))}
        </div>
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

export default WeddingNotesPage;




