import { useContext } from "react";
import DataContext from "../Context/DataContext.jsx";
import close from '../assets/img/x.svg';

function Reserve(){

    const { setModalReserve, modalReserve } = useContext(DataContext);

    if(modalReserve === null){
        return null;
    }

    const deleteRecord = () =>{
        // if(modalReserve.target === 'clothes')
        //     setDeleteData(modalReserve);
        // else if(modalReserve.target === 'order')
        //     setDeleteOrder(modalReserve);
        // setModalReserve(null);
    }

    return(
        <div className="modal">
            <div className="modal-container">
                <img src={close} alt='Exit' className="btn-delete" onClick={() => setModalReserve(null)}></img>
                <div className="modal-info-container">
                    <h3 className="modal-info-title">Knygų reservavimas</h3>
                </div>
                <div className="input-field">
                    <div className="input-container">
                        <label>Reservuoti nuo</label>
                        <input type="date" className="input-text"></input>
                    </div>
                 </div>
                <div className="modal-btn-container">
                    <button className="btn" onClick={() => setModalReserve(null)}>Atšaukti</button>
                    <button className="btn" onClick={deleteRecord}>Patvirtinti</button>
                </div>
            </div>
        </div>
    );
}

export default Reserve;