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
  const [caterers, setCaterers] = useState('');
  const [clothing, setClothing] = useState('');
  const [cake, setCake] = useState('');
  const [bridalparty, setBridalparty] = useState('');
  const [lodging, setLodging] = useState('');
  const [registry, setRegistry] = useState('');
  const [expenses, setExpenses] = useState('');
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
  const handleCreateWeddingNote = async (e) => {
    e.preventDefault();
    if (hasNote) {
      alert('You have already created a wedding note!');
      router.push('/weddingplan');
      return;
    }
    const { user } = props; // Destructure the user object from props
    const { _id: userId } = user; // Extract the userID from the user object because we need userId for CRUD

    try {
      await axios.post('/api/weddingnotes', {
        userId,
        date,
        budget,
        guests,
        venue,
        caterers,
        clothing,
        cake,
        bridalparty,
        lodging,
        registry,
        expenses
      });

      await fetchWeddingNotes();

      setDate('');
      setBudget('');
      setGuests('');
      setVenue('');
      setCaterers('');
      setClothing('');
      setCake('');
      setBridalparty('');
      setLodging('');
      setRegistry('');
      setExpenses('');

      alert('Wedding note has been created!');

    router.push('/weddingplan');
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
      </Head>
      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />

      <main>
  
      <div>
      <h1 className={styles.formTitle}>Create Your Wedding Vision</h1>
      <form onSubmit={handleCreateWeddingNote} className={styles.planForm}>
        <input type="text" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} className={styles.formInput} />
        <input type="text" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={styles.formInput} />
        <input type="text" placeholder="Guests" value={guests} onChange={(e) => setGuests(e.target.value)} className={styles.formInput} />
        <input type="text" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} className={styles.formInput} />
        <input type="text" placeholder="Caterers" value={caterers} onChange={(e) => setCaterers(e.target.value)} className={styles.formInput} />
        <input type="text" placeholder="Clothing" value={clothing} onChange={(e) => setClothing(e.target.value)} className={styles.formInput} />
        <input type="text" placeholder="Cake" value={cake} onChange={(e) => setCake(e.target.value)} className={styles.formInput} />
        <input type="text" placeholder="Bridesmaids and Groomsmen" value={bridalparty} onChange={(e) => setBridalparty(e.target.value)} className={styles.formInput} />
        <input type="text" placeholder="Lodging" value={lodging} onChange={(e) => setLodging(e.target.value)} className={styles.formInput} />
        <input type="text" placeholder="Registry" value={registry} onChange={(e) => setRegistry(e.target.value)} className={styles.formInput} />
        <input type="text" placeholder="Other expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} className={styles.formInput} />
        <button type="submit" className={styles.submitButton}>Create Wedding Note</button>
  </form>
    <div>
  {weddingNotes.map((note) => (
    <div key={note._id}>
      <p> Date: {note.date}</p>
      <p>Budget: {note.budget}</p>
      <p>Guests: {note.guests}</p>
      <p>Venue: {note.venue}</p>
      <p>Caterers: {note.caterers}</p>
      <p>Clothing: {note.clothing}</p>
      <p>Cake: {note.cake}</p>
      <p>Bridesmaids and Groomsmen: {note.bridalparty}</p>
      <p>Lodging: {note.lodging}</p>
      <p>Registry: {note.registry}</p>
      <p>Other expenses: {note.expenses}</p>
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
      </main>
    </div>
  );
};

export default WeddingNotesPage;




