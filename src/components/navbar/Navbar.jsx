import React, { useRef, useState } from 'react'
import './navbar.scss'
import {useMotionValueEvent, motion, useScroll } from 'framer-motion'
import Sidebar from '../sidebar/Sidebar'
import ColorContext from '../../context/context'

const Navbar = () => {

  const logo = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1.5, transition: { duration: 1 } },
  }

  const logoRef = useRef()

  let toggleColor = false

  const handleColor = () => {
    toggleColor = !toggleColor;

    if (toggleColor) {
      logoRef.current.style.color = 'white';
    } else {
      logoRef.current.style.color = 'lightgray';
    }
  }

  const [hidden, setHidden] = useState(false);
  // const { scrollY } = useScroll();

  // useMotionValueEvent(scrollY, 'change', (latest) => {
  //   const previous = scrollY.getPrevious();
  //   // console.log(latest, previous)
  //   if (latest > previous && latest > 150) {
  //     setHidden(true);
  //   }
  //   else {
  //     setHidden(false);
  //   }
  // })


  return (
    <ColorContext.Provider value={handleColor} >
      <motion.div className='navbar'
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' }
        }}
        animate={hidden ? 'hidden' : 'visible'}
      >
        {/* <Sidebar handleColor={handleColor} /> */}
        <Sidebar />
        <div className="wrapper">
          <motion.div ref={logoRef} className="logo" variants={logo} initial='hidden' animate='visible' >
            <span className='symbol'>&lt;</span>Sushil<span style={{ color: '#854CE6' }}>/</span>Verma<span className='symbol'>&gt;</span>
          </motion.div>
          <div className="social">

            <a href="https://www.facebook.com"><motion.img initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} src="/facebook.png" alt="facebook" /></a>

            <a href="#"><motion.img initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} src="/github.png" alt="Github" /></a>

            <a href="#"><motion.img initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} src="/linkedin.png" alt="Linkedin" /></a>

            <a href="#"><motion.img initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9 }} src="/instagram.png" alt="instagram" /></a>
          </div>
        </div>
      </motion.div>
    </ColorContext.Provider>
  )
}

export default Navbar
