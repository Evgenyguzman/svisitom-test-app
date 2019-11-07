import React from 'react'
import { Link } from 'react-router-dom'
export const Header = ({isSignedIn, onQuit}) => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li>
        {
          isSignedIn ? <button onClick={onQuit}>Выход</button> : null
        }
        </li>
      </ul>
    </nav>
  </header>
)