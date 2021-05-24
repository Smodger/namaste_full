import React from 'react';
import { Link, HashRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export const MobileMenu = (props) => {
  let sidebarClasses = ['sidebar'];

  if(props.show){
    sidebarClasses = ['sidebar', "open"];
  }

  return (
    <HashRouter>
      <nav className={sidebarClasses.join(" ")} >
          <ul>
            <div className="header-logo-mobile"></div>
            <li><Link to='/' className="">Home</Link></li>
            <li><Link to='/about' className="">About Me</Link></li>
            <li><Link to='/lessons' className="">Class schedule</Link></li>
            <li><Link to='/online-classes' className=''>Online Library</Link></li>
            <li><Link to='/list-retreats' className="">Retreats</Link></li>
            <li><Link to='/list-workshops' className="">Workshops</Link></li>
            <li><Link to='/contact' className="">Contact</Link></li>
          </ul>
      </nav>
    </HashRouter>
  )
}
