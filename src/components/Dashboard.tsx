import React, {ReactNode} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {auth} from "../services/firebase";
import {useAuth} from "../hooks/auth/useAuth";
import {useTextGlobals} from "../hooks/i18n/useTextGlobals";

type DashboardProps = {
  children?: ReactNode;
}

export function Dashboard(props: DashboardProps) {
  const {texts} = useTextGlobals(process.env.REACT_APP_TEXT_LOCALE)
  const {user} = useAuth();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {children} = props;

  function setPathLocationHome() {
    navigate('/home')
  }

  function shadowNavItemIsActive(compare: string) {
    return pathname === compare ? 'hvr-shadow-radial' : '';
  }

  function signOutGoogleAccount() {
    auth.signOut()
      .then(() => console.log('S'))
      .finally(() => navigate(''))
      .catch(() => console.log('S'))
  }

  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <span
          className="navbar-brand col-md-3 col-lg-2 me-0 px-5">
          {texts.DASHBOARD_BRAND}
        </span>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="navbar-nav navbar-custom-margin">
          <div className="d-flex">
            <img
              src={`${user ? user.avatar : ''}`} alt="Avatar"
              className='img-dashboard-avatar rounded-circle nav-link align-self-end px-3'
            />
            <span
              onClick={signOutGoogleAccount}
              className="nav-link my-auto">
              {texts.DASHBOARD_LOGOOUT}
            </span>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu"
               className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse bg-dark">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column mt-lg-5 w-100">
                <li className={`${shadowNavItemIsActive('/home')} nav-item nav-item-pointer`}>
                  <span
                    onClick={setPathLocationHome}
                    className="nav-link active text-light h6 mx-5"
                    aria-current="page">
                    <i className="bi-house-door-fill me-2"/>
                    {texts.DASHBOARD_SIDENAV_DASHBOARD}
                  </span>
                </li>
              </ul>
            </div>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 h-50">
            <div
              className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center
              pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">{texts.DASHBOARD_HEADER_TITLE}</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                {/*Toolbar*/}
              </div>
            </div>
            {/*Content App*/}
            <div>{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}

