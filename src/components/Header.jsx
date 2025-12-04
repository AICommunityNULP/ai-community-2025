import React from 'react'
import "../styles/header.css"
import { Link } from 'react-scroll'

const Header = () => {
  return (
    <header>
      <div className="logo__container">
        <div className="logo"></div>
      </div>
      <div className="nav__menu__container">
        <Link className="nav__items" to="about" smooth={true} offset={-100} duration={500}>Про подію</Link>
        <Link className="nav__items" to="speakers" smooth={true} offset={-100} duration={500}>Спікери</Link>
        <Link className="nav__items" to="program" smooth={true} offset={-100} duration={500}>Програма</Link>
        <Link className="nav__items" to="sponsors" smooth={true} offset={-100} duration={500}>Партнери</Link>
      </div>
    </header>
  )
}

export default Header
