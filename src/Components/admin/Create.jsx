import { useRef, useState } from "react";
import getBase64 from "../../Functions/getBase64";
import ShowNav from "../ShowNav";
import delImg from "../../assets/img/x.svg"
import List from "./List";
import Edit from "../Edit";
import Delete from "../Delete";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";

function Create(){

    const [photoPrint, setPhotoPrint] = useState(null);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [cat, setCat] = useState('action');
    const [date,setDate] = useState(new Date(Date.now()));

    const fileInput = useRef();

    const { setSaveBook } = useContext(DataContext);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {})
    }

    const saveRecord = () => {
        setSaveBook({
            name,
            author,
            category:cat,
            date,
            image: photoPrint,
        })
        setPhotoPrint(null);
        fileInput.current.value = null;
        setName('');
        setAuthor('');
        setCat('action');
        setDate(new Date(Date.now()));
    }

    return(
        <div className="create">
            <ShowNav />
            <div className="input-field">
                <div className="input-container">
                    <label>Knygų pavadinimas</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-text"></input>
                </div>
                <div className="input-container">
                    <label>Autorius</label>
                    <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="input-text"></input>
                </div>
                <div className="input-container">
                    <label>Kategorija</label>
                    <select className="input-select" value={cat} onChange={e => setCat(e.target.value)}>
                        <option value='action'>Action</option>
                        <option value='comedy'>Comedy</option>
                        <option value='horror'>Horror</option>
                        <option value='drama'>Drama</option>
                        <option value='sci-fi'>Sci-fi</option>
                        <option value='fantasy'>Fantasy</option>
                    </select>
                </div>
                <div className="input-container">
                    <label>Išleidimo metai</label>
                    <input type="date" className="input-text" value={date} onChange={e => setDate(e.target.value)}></input>
                </div>
                <div className="create-label">
                <label>Nuotrauku parinkimas:</label>
                    <div className="image-control">
                        <input type='file' ref={fileInput} className="btn file-input" onChange={doPhoto} onClick={(e) => e.target.value = null }></input>
                        {photoPrint ?
                        <div className="image-preview">
                            <img className="btn-delete-image" src={delImg} alt='Remove img' onClick={() => {setPhotoPrint(null); fileInput.current.value = null }}></img>
                            <img src={photoPrint} alt='Preview'></img>
                        </div>
                        : null}
                    </div>
                </div>
                <button className="btn" onClick={saveRecord}>Sukurti</button>
            </div>
            <List />
            <Edit />
            <Delete />
           
        </div>
    )
}

export default Create;