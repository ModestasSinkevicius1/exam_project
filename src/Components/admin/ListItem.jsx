import { useContext } from "react";
import noImg from "../../assets/img/no-image.svg";
import DataContext from "../../Context/DataContext";

function ListItem( {book} ) {

    const { setModalEdit, setModalDelete } = useContext(DataContext);
    let fullDate = new Date(book.date);
    fullDate = new Date(fullDate.setMonth(fullDate.getMonth()+1));
    return (
        <tr className="list-item">
            <td>{book.image ? <img src={book.image} alt='knygu atvaizdavimas'></img> : <img src={noImg} alt='knygu atvaizdavimas'></img>}</td>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>{`${fullDate.getFullYear()}-${fullDate.getMonth()}-${fullDate.getDate()}`}</td>
            <td>
                <div className="options">
                    <button className="btn" onClick={() => setModalEdit(book)}>Edit</button>
                    <button className="btn" onClick={() => setModalDelete(book)}>Delete</button>
                </div>
            </td>
        </tr>
    )
}

export default ListItem;