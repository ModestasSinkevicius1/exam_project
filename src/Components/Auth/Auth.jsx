import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login, logout, authConfig } from "../../Functions/auth";
import ShowNav from "../ShowNav";

export function RequireAuth({ children, role }) {
    const [view, setView] = useState(<h2>Please wait...</h2>);
    useEffect(() => {
      axios.get('http://localhost:3007/login-check?role=' + role, authConfig())
        .then(res => {
          if ('ok' === res.data.msg) {
            setView(children);
          }
          else if (res.data.status === 2) {
            setView(<h2>Unauthorize...</h2>)
          }
          else {
            setView(<Navigate to="/login" replace />);
          }
        })
  
    }, [children, role]);
  
    return view;
}

export function LoginPage({ setRefreshStatus }) {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const [loginWarning, setLoginWarning] = useState(null);

  const doLogin = () => {
    axios.post('http://localhost:3007/login', { user, pass })
      .then(res => {
        setRefreshStatus(Date.now());
        if ('ok' === res.data.msg) {
          login(res.data.key);
          navigate('/home', { replace: true });
        }
        else{
          setLoginWarning('Wrong name or password');
        }
      })
  }
  return (
<>
<ShowNav/>
    <div className="login-container">
      <h2>Login</h2>
      {loginWarning ?<span className="login-warning">*Wrong name or password*</span> : null}
      <div className="login-row"><label>Name: </label><input type="text" className="login-input-text" value={user} onChange={e => setUser(e.target.value)}></input></div>
      <div className="login-row"><label>Password: </label><input type="password" className="login-input-text" value={pass} onChange={e => setPass(e.target.value)}></input></div>
      <button onClick={doLogin} className='btn btn-login bg-light'>Login</button>
    </div>
    </>
  );
}

export function LogoutPage({ setRefreshStatus }) {
  useEffect(() => {
    logout();
  }, []);
  //setRefreshStatus(Date.now());
  return (
    <Navigate to="/login" replace />
  )
}