import React from 'react'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import logoImage from '../../resources/eKartLogo.png'

function Landing() {
  return (
    <div>
        <img className="logo-image" src={logoImage} alt="" />
      <SignUp />
    </div>
  )
}

export default Landing
