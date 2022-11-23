import { useContext } from "react";
import DataContext from "../Context/DataContext.jsx";
import close from '../assets/img/x.svg';
import { useState } from "react";
import { useRef } from "react";
import getBase64 from "../Functions/getBase64";
import delImg from "../assets/img/x.svg"
import { useEffect } from "react";

function Edit(){

    const { setModalEdit, modalEdit, setEditBook } = useContext(DataContext);

    const [photoPrint, setPhotoPrint] = useState(null);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [cat, setCat] = useState('action');
    const [date,setDate] = useState(new Date(Date.now()));

    const fileInput = useRef();

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {})
    }

    useEffect(() => {
        if(modalEdit === null){
            return;
        }
        setName(modalEdit.name);
        setAuthor(modalEdit.author);
        setCat(modalEdit.category);
        setDate(new Date(modalEdit.date));
        setPhotoPrint(modalEdit.image)
    }, [modalEdit]);

    if(modalEdit === null){
        return null;
    }

    const updateRecord = () =>{
        setEditBook({
            id: modalEdit.id,
            name,
            author,
            category: cat,
            date,
            image: photoPrint,
        })
        setModalEdit(null);
    }

    return(
        <div className="modal">
            <div className="modal-container-edit">
                <img src={close} alt='Exit' className="btn-delete" onClick={() => setModalEdit(null)}></img>
                <div className="modal-info-container">
                    <h3 className="modal-info-title">Keisti knygą</h3>
                </div>
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
                 </div>
                <div className="modal-btn-container">
                    <button className="btn" onClick={() => setModalEdit(null)}>Atšaukti</button>
                    <button className="btn" onClick={updateRecord}>Patvirtinti</button>
                </div>
            </div>
        </div>
    );
}

export default Edit;