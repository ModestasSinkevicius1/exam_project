import { useContext } from "react";
import DataContext from "../../Context/DataContext";
import ListItem from "./ListItem";

function List(){

    const { books } = useContext(DataContext);

    return (
    <div className="list">
        <table>
            <thead>
                <tr>
                    <th>Nuotrauka</th>
                    <th>Pavadinimas</th>
                    <th>Autorius</th>
                    <th>Žanras</th>
                    <th>Išleidimo data</th>
                    <th>Pasirinkimai</th>
                </tr>
                {books?.map(b => b.show ? <ListItem key={b.id} book={b} /> : null)}            
            </thead>
        </table>
    </div>);
}

export default List;