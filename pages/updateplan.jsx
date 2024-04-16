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


const UpdateNotePage = (props) => {
const router = useRouter();
  const logout = useLogout();
  const { id } = router.query;
  const [note, setNote] = useState({}); // State to store the note data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`/api/weddingnotes?id=${id}`);
        setNote(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wedding note:', error);
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/weddingnotes?id=${id}`, note);
      router.push('/weddingplan');
    } catch (error) {
      console.error('Error updating wedding note:', error);
    }
  };
  
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.updateBackground}>    
      <Head>
        <title> Update your plan</title>
        <meta name="description" content="Need to make changes to your plan? Go ahead!" />
        <html lang="en" />
      </Head>
      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />
      <h1 className={styles.formTitle}>Update Wedding Note</h1>
      <form onSubmit={handleUpdate}>
  {note && (
    <div className={styles.planForm}>
      <input
        type="text"
        placeholder="Budget"
        value={note.budget}
        onChange={(e) => setNote({ ...note, budget: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Guests"
        value={note.guests || ''}
        onChange={(e) => setNote({ ...note, guests: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Venue"
        value={note.venue || ''}
        onChange={(e) => setNote({ ...note, venue: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Theme"
        value={note.theme || ''}
        onChange={(e) => setNote({ ...note, theme: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Caterers"
        value={note.caterers || ''}
        onChange={(e) => setNote({ ...note, caterers: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Alcohol"
        value={note.alcohol || ''}
        onChange={(e) => setNote({ ...note, alcohol: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Vendors"
        value={note.vendors || ''}
        onChange={(e) => setNote({ ...note, vendors: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Rentals"
        value={note.rentals || ''}
        onChange={(e) => setNote({ ...note, rentals: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Dress"
        value={note.dress || ''}
        onChange={(e) => setNote({ ...note, dress: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Suit"
        value={note.suit || ''}
        onChange={(e) => setNote({ ...note, suit: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Florals"
        value={note.florals || ''}
        onChange={(e) => setNote({ ...note, florals: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Transportation"
        value={note.transportation || ''}
        onChange={(e) => setNote({ ...note, transportation: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Cake"
        value={note.cake || ''}
        onChange={(e) => setNote({ ...note, cake: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Invitations"
        value={note.invitations || ''}
        onChange={(e) => setNote({ ...note, invitations: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Decor"
        value={note.decor || ''}
        onChange={(e) => setNote({ ...note, decor: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Bridesmaids"
        value={note.bridesmaids || ''}
        onChange={(e) => setNote({ ...note, bridesmaids: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Groomsmen"
        value={note.groomsmen || ''}
        onChange={(e) => setNote({ ...note, groomsmen: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Lodging"
        value={note.lodging || ''}
        onChange={(e) => setNote({ ...note, lodging: e.target.value })}
        className={styles.formInput}
      />
      <input
        type="text"
        placeholder="Registry"
        value={note.registry || ''}
        onChange={(e) => setNote({ ...note, registry: e.target.value })}
        className={styles.formInput}
      />

      <button type="submit" className={styles.submitButton}>Save Changes</button>
    </div>
  )} 
</form>
<div className={styles.grid}>

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

export default UpdateNotePage;

