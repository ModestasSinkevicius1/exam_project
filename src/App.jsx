import './Styles/Base/App.css';
import DataContext from './Context/DataContext.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Home from './Components/client/Home.jsx';
import Create from './Components/admin/Create';
import { LoginPage, LogoutPage, RequireAuth } from './Components/Auth/Auth';
import Footer from './Components/Footer';
import { useEffect } from 'react';
import axios from 'axios';
import { authConfig } from './Functions/auth';

// const reList = data => {
//   const d = new Map();
//   data.forEach(line => {
//       if (d.has(line.title)) {
//           d.set(line.title, [...d.get(line.title), line]);
//       } else {
//           d.set(line.title, [line]);
//       }
//   });
//   return [...d].map((d1, i) => ([...d1, {show: true}]));
//   //or
//   return [...d];
// }

function App() {

  const [refresh, setRefresh] = useState(Date.now());
  const [refreshStatus, setRefreshStatus] = useState(Date.now());

  const [status, setStatus] = useState(1);

  const [modalEdit, setModalEdit] = useState(null);
  const [modalDelete, setModalDelete] = useState(null);
  const [modalReserve, setModalReserve] = useState(null);

  const [books, setBooks] = useState(null);
  const [reservations, setReservations] = useState(null);
  const [createRes, setCreateRes] = useState(null);
  const [updateRes, setUpdateRes] = useState(null);

  const [saveBook, setSaveBook] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);

// GET
  useEffect(()=>{
    if(status === 1){
        return;
    }
    axios.get('http://localhost:3007/books', authConfig())
    .then(res => {
      setBooks(res.data.map((d, i) => ({...d, show: true, row: i})))
    })
    .catch(_ => setBooks('error'));
  }, [refresh, status]);

// GET RESERVATIONS
  useEffect(()=>{
    if(status === 1){
        return;
    }
    axios.get('http://localhost:3007/reservations', authConfig())
    .then(res => {
      setReservations(res.data.map((d, i) => ({...d, show: true, row: i})))
    })
    .catch(_ => setReservations('error'));
  }, [refresh, status]);

//CREATE
useEffect(()=>{
  if(saveBook === null){
    return;
  }
  axios.post('http://localhost:3007/books', saveBook, authConfig())
  .then(res => setRefresh(Date.now()));
}, [saveBook]);

//CREATE RESERVATION
useEffect(()=>{
  if(createRes === null){
    return;
  }
  axios.post('http://localhost:3007/reservations', createRes, authConfig())
  .then(res => setRefresh(Date.now()));
}, [createRes]);

//UPDATE
useEffect(()=>{
  if(editBook === null){
    return;
  }
  axios.put('http://localhost:3007/books/' + editBook.id, editBook, authConfig())
  .then(res => setRefresh(Date.now()));
}, [editBook]);

//UPDATE RESERVATION
useEffect(()=>{
  if(updateRes === null){
    return;
  }
  axios.put('http://localhost:3007/reservations/' + updateRes.id, updateRes, authConfig())
  .then(res => setRefresh(Date.now()));
}, [updateRes]);

//DELETE
useEffect(() => {
  if (null === deleteBook) {
      return;
  }
  axios.delete('http://localhost:3007/books/'+ deleteBook.id, authConfig())
  .then(res => setRefresh(Date.now()));
}, [deleteBook]);

  return (
    <BrowserRouter>
    <DataContext.Provider value={{
      refreshStatus,
      status,
      setStatus,
      setRefresh,
      refresh,
      setModalEdit,
      modalEdit,
      setModalDelete,
      modalDelete,
      setModalReserve,
      modalReserve,
      books,
      reservations,
      setBooks,
      setSaveBook,
      setEditBook,
      setDeleteBook,
      setCreateRes,
      setUpdateRes,
    }}>
      <div className="App">
        <header className="App-header">
          {/* <ShowNav /> */}
          <Routes>
            <Route path='/' element={<LoginPage setRefreshStatus={setRefreshStatus} />}> </Route>
            <Route path='/login' element={<LoginPage setRefreshStatus={setRefreshStatus} />}> </Route>
            <Route path='/logout' element={<LogoutPage setRefreshStatus={setRefreshStatus} />}> </Route>
            <Route path='/home' element={<RequireAuth role='user'><Home /></RequireAuth>}></Route>
            <Route path='/admin/knygos' element={<RequireAuth role='admin'><Create /></RequireAuth>}></Route>
          </Routes>
          <Footer />
        </header>
      </div>
    </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
