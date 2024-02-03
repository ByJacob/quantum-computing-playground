import React from 'react';
import './App.css';
import ProjectsPage from './projects/ProjectsPage';
import ProjectPage from './projects/ProjectPage';

import { Routes, Route, NavLink, useLocation} from 'react-router-dom';
import HomePage from './home/HomePage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  let location = useLocation();
  return (
    <>
      <header className="sticky">
      <span className="logo">
        <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
      </span>
      <NavLink to="/"  className="button rounded">
        <span className="icon-home"></span>
        Home
      </NavLink>
      <NavLink to="/projects" className="button rounded">
        Projects
      </NavLink>
    </header>
      <div className="container">
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade"  timeout={{ enter: 400, exit: 200 }}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectPage />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
}

export default App;
