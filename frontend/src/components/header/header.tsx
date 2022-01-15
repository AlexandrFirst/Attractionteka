import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './header.css'
import logo from '../../img/Attractionteka.png'
import iconmenu from './img/iconmenu.png'
import iconprofile from './img/iconprofile.png'
import header from './img/header.png'
import Search from '../search/search'
import { RouteNames } from '../../routes'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { LocalStorageKey } from '../../types/LocalStorageKey'
import { useActions } from '../../hooks/useActions'
import { IUser } from '../../models/IUser'
import { UserDTO } from '../../models/user/userDTO'

export interface HeaderProps {
  flag_search?: boolean
}

const Header: FC<HeaderProps> = (props) => {
  const { setUser } = useActions()

  const { user } = useTypedSelector((state) => state.auth)
  const [userDataState, setUserDataState] = useState<UserDTO>({} as UserDTO)

  useEffect(() => {
    const userFromStorage = localStorage.getItem(LocalStorageKey.user)
    const user = (userFromStorage && JSON.parse(userFromStorage)) || {
      id: 1,
      mail: 'root@gmail.com',
      name: 'Olexander',
      surname: 'Lohvinov',
      password: '123',
    }
    setUser(user)
  }, [])

  useEffect(() => {
    setUserDataState(user)
  }, [user])

  return (
    <header className='header'>
      <img src={header} alt='Logo' className='header-background' />
      <Link to={RouteNames.MAIN} className='link'>
        <img src={logo} alt='Logo' className='header-logo' />
      </Link>
      <Search flag_search={props.flag_search} />
      <div className='icon-profile'>
        <Link to={RouteNames.LOGIN}>
          <img src={iconprofile} alt='error' />
        </Link>
      </div>
      <div className='icon-menu'>
        <Link to={RouteNames.USER + `/${userDataState.id}`}>
          <img src={iconmenu} alt='error' />
        </Link>
      </div>
    </header>
  )
}

export default Header
