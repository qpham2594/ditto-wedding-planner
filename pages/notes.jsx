import { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../components/header";


function NotesPage() {
    const [noteData, setNoteData] = useState({
        budget: "",
        guests: "",
        venue: "",
        theme: "",
        caterers: "",
        alcohol: "",
        vendors: "",
        rentals: "",
        dress: "",
        suit: "",
        florals: "",
        transportation: "",
        cake: "",
        invitations: "",
        decor: "",
        bridesmaids: "",
        groomsmen: "",
        lodging: "",
        registry: ""
    });

    useEffect(() => {
        fetchWeddingNotes();
    }, []);

    const fetchWeddingNotes = async () => {
        try {
            // existing wedding notes 
            const response = await axios.get("/api/notes");
            const existingNotes = response.data;
            setNoteData(existingNotes);
        } catch (error) {
            console.error("Error fetching wedding notes data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoteData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            // Save entire note data
            await axios.post('/api/weddingnotes', noteData);
            console.log("Note data saved successfully");
        } catch (error) {
            console.error("Error saving note data:", error);
        }
    };

    return (
        <div>
            <h1>Wedding Notes</h1>
            <div>
                {Object.keys(noteData).map((key) => (
                    <div key={key}>
                        <label>{key}</label>
                        <input
                            type="text"
                            name={key}
                            value={noteData[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
            <button onClick={handleSave}>Save Notes</button>
        </div>
    );
}

export default NotesPage;





