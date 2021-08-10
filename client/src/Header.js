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
        <li className={classNames('_item', { active })}>
          <a href="/">Home</a>
        </li>

        <li className={classNames('_item', { active })}>
          <Link onClick={() => setActive(false)} to="/resources">
            Resources
          </Link>
        </li>
        <li className={classNames('_item', { active })}>
          <Link onClick={() => setActive(false)} to="/dreamact">
            Dream Act
          </Link>
        </li>
        <li className={classNames('_item', { active })}>
          <Link onClick={() => setActive(false)} to="/immigration">
            Immigration
          </Link>
        </li>

        <li className={classNames('_item collapsed', { active })}>
          <Link onClick={() => setActive(false)} to="/employment">
            Employment
          </Link>
        </li>
        <li className={classNames('_item collapsed', { active })}>
          <Link onClick={() => setActive(false)} to="/housing">
            Housing
          </Link>
        </li>
        <li className={classNames('_item collapsed', { active })}>
          <Link onClick={() => setActive(false)} to="/financialaid">
            Financial Aid
          </Link>
        </li>
        <li className={classNames('_item collapsed', { active })}>
          <Link onClick={() => setActive(false)} to="/about">
            About
          </Link>
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
