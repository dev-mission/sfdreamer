import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import './Header.scss';
import Api from './Api';
import { useAuthContext } from './AuthContext';

function Header() {
  const history = useHistory();
  const { user, setUser } = useAuthContext();

  useEffect(
    function () {
      Api.users.me().then((response) => {
        if (response.status === 204) {
          setUser(null);
        } else {
          setUser(response.data);
        }
      });
    },
    [setUser]
  );

  const onLogout = async function (event) {
    event.preventDefault();
    await Api.auth.logout();
    setUser(null);
    history.push('/');
  };

  return (
    <nav className="_nav">
      <ul className="_menu">
        <li className="_logo">
          <a href="/">
            <img src="/images/Logo.png" alt="SF Dreamer" />
          </a>
        </li>
        <li className="_item collapsed">
          <a href="">Dream Act Info</a>
        </li>
        <li className="_item">
          <a href="/questions/1">Eligibility Survey</a>
        </li>
        <li className="_item collapsed">
          <a href="">Mock Application</a>
        </li>
        <li className="_item">
          <a href="/forms">AB-540 Forms</a>
        </li>
        <li className="_item">
          <a href="/resources">Resources</a>
        </li>
        <li className="_item collapsed">
          <a href="/about">About</a>
        </li>
        {user && (
          <>
            <li className="_item collapsed">
              <a href="/logout" onClick={onLogout}>
                Log out
              </a>
            </li>
          </>
        )}
        {!user && (
          <li className="_item collapsed">
            <Link to="/login">Log in</Link>
          </li>
        )}
        <li className="_toggle">
          <span className="_bars"></span>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
