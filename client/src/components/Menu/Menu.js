"use client"
import React, { useEffect, useRef, useState, Fragment, useContext } from 'react'
import styles from './Menu.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ctx } from '@/context/appContext'
export const Menu = () => {
  const [left, setLeft] = useState(-130);
  const [menuItem, setMenuItem] = useState('home');
  const ctxData = useContext(ctx);
  const [isMobileView, setIsMobileView] = useState(document.body.offsetWidth < 800 ? true : false);
  const refObj = useRef();
  const pathName = usePathname();
  const afterAuthRoutes = ['home', 'profile', 'users']
  const findWidth = () => {
    setIsMobileView(document.body.offsetWidth < 800 ? true : false)
  }
  const fnSetMenuItem = () => {
    setMenuItem((afterAuthRoutes.includes(pathName.slice(1)) ? pathName.slice(1) : 'home'))
  }
  const fnResize = () => {
    window.addEventListener("resize", () => {
      if (!refObj.timeOutId) {
        findWidth()
      }
      clearTimeout(refObj.timeOutId)
      refObj.timeOutId = setTimeout(() => {
        findWidth()
      }, 100)
    })
  }
  useEffect(() => {
    fnResize()
    fnSetMenuItem();
  })
  const fnMobileMenuBtnClick = () => {
    setLeft(left == 0 ? -130 : 0);
  }
  const fnMenuItemClick = (eve) => {
    eve.stopPropagation();
    setMenuItem(eve.target.id)
    if (isMobileView) {
      setLeft(-130);
    }
  }
  const fnLogout = (eve) => {
    eve.stopPropagation();
    sessionStorage.clear();
    ctxData.dispatch({
      type: "AUTH",
      payload: {
        isLoggedIn: false,
        userInfo: {}
      }
    })
  }
  return <Fragment className="">
    {isMobileView && <button onClick={fnMobileMenuBtnClick} className={`position-absolute end-0 ${styles.mobileMenuBtn}`}><span></span><span></span><span></span></button>}
    <ul onClick={fnMenuItemClick} style={{ left: left }} className={`${isMobileView ? styles.mobileMenu : styles.menu}`}>
      <li>
        <Link id="home" className={`${menuItem == 'home' && styles.menuActive}`} href="/home">Home</Link>
      </li>
      <li>
        <Link id="users" className={`${menuItem == 'users' && styles.menuActive}`} href="/users">Users</Link>
      </li>
      <li>
        <Link id="profile" className={`${menuItem == 'profile' && styles.menuActive}`} href="/profile">Profile</Link>
      </li>
      <li>
        <Link onClick={fnLogout} id="logout" href="/login">Logout</Link>
      </li>
    </ul>
  </Fragment>
}
