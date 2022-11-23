import axios from 'axios';
import { useEffect, useContext } from 'react';
import DataContext from '../Context/DataContext.jsx';
import { authConfig } from '../Functions/auth';
import Nav from './Nav';

function ShowNav() {

    const {status, setStatus, setRefresh} = useContext(DataContext);

    const {refreshStatus} = useContext(DataContext);

    useEffect(() => {
      axios.get('http://localhost:3007/login-check?role=admin', authConfig())
        .then(res => {
          setStatus(res.data.status);
          setRefresh(Date.now());
        })
    }, [refreshStatus, setStatus, setRefresh]);
    return <Nav status={status} />
}

export default ShowNav;