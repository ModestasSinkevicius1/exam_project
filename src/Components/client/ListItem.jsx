import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import noImg from "../../assets/img/no-image.svg";
import DataContext from "../../Context/DataContext";

function ListItem( {book} ) {

    const [ retBook, setRetBook ] = useState(null);

    const [ exBook, setExBook ] = useState(null);

    const [ warning, setWarning ] = useState(null)

    const { setCreateRes, setUpdateRes, reservations } = useContext(DataContext);

    let fullDate = new Date(book.date);
    fullDate = new Date(fullDate.setMonth(fullDate.getMonth()+1));

    const addTermination = () =>{
        let fullDateObj = new Date(Date.now());
        fullDateObj = new Date(fullDateObj.setMonth(fullDateObj.getMonth()+3));
        setRetBook(`${fullDateObj.getFullYear()}-${fullDateObj.getMonth()}-${fullDateObj.getDate()}`);  
    }

    const extendTermination = () =>{
        if(reservations?.find(r => r.knygos_id === book.id)?.count <= 2){
        let fullDateObj = new Date(reservations?.find(r => r.knygos_id === book.id)?.terminas);
        fullDateObj = new Date(fullDateObj.setMonth(fullDateObj.getMonth()+2));
        setExBook(`${fullDateObj.getFullYear()}-${fullDateObj.getMonth()}-${fullDateObj.getDate()}`);
        }
        setWarning('Negalima pratesti negu 2 kartus')
    }

    useEffect(()=>{
        if(retBook === null){
            return;
        }
        setCreateRes({
            terminas: retBook,
            count: 1,
            knygos_id: book.id,
        });
    }, [retBook]);

    useEffect(()=>{
        if(exBook === null){
            return;
        }
        setUpdateRes({
            terminas: retBook,
            count: 2,
            id: reservations?.find(r => r.knygos_id === book.id)?.id,
        });
    }, [exBook]);

    return (
        <tr className="list-item">
            <td>{book.image ? <img src={book.image} alt='knygu atvaizdavimas'></img> : <img src={noImg} alt='knygu atvaizdavimas'></img>}</td>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>{`${fullDate.getFullYear()}-${fullDate.getMonth()}-${fullDate.getDate()}`}</td>
            <td>
                <div className="options">
                    <h4>{warning}</h4>
                    {retBook ? <span className="term">Gražinti iki: {retBook}</span> : null}
                    {reservations?.find(r => r.knygos_id === book.id)?.count ?
                    <button className="btn" onClick={extendTermination}>Pratesti</button>
                    :        
                    <button className="btn" onClick={addTermination}>Rezervuoti</button>
                    }
                </div>
            </td>
        </tr>
    )
}

export default ListItem;