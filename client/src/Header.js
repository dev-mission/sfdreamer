import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import classNames from 'classnames';

import './Header.scss';
import Api from './Api';
import { useAuthContext } from './AuthContext';

function Header() {
  const history = useHistory();
  const { user, setUser } = useAuthContext();
  const [active, setActive] = useState(false);

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
          <Link onClick={() => setActive(false)} to="/">
            <img src="/images/Logo.png" alt="SF Dreamer" />
          </Link>
        </li>
        <li className={classNames('_item collapsed', { active })}>
          <a href="/">Dream Act Info</a>
        </li>
        <li className={classNames('_item', { active })}>
          <a href="/questions/1">Eligibility Survey</a>
        </li>
        <li className={classNames('_item collapsed', { active })}>
          <a href="/">Mock Application</a>
        </li>
        <li className={classNames('_item', { active })}>
          <a href="/forms">AB-540 Forms</a>
        </li>
        <li className={classNames('_item', { active })}>
          <Link onClick={() => setActive(false)} to="/resources">
            Resources
          </Link>
        </li>
        <li className={classNames('_item', { active })}>
          <Link onClick={() => setActive(false)} to="/questions">
            Questions
          </Link>
        </li>
        <li className={classNames('_item collapsed', { active })}>
          <a href="/about">About</a>
        </li>
        {user && (
          <>
            <li className={classNames('_item collapsed', { active })}>
              <a href="/logout" onClick={onLogout}>
                Log out
              </a>
            </li>
          </>
        )}
        {!user && (
          <li className={classNames('_item collapsed', { active })}>
            <Link onClick={() => setActive(false)} to="/login">
              Log in
            </Link>
          </li>
        )}
        <li className="_toggle" onClick={() => setActive(!active)}>
          <span className="_bars"></span>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
