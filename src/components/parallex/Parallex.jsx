import React, { useRef } from 'react'
import './parallex.scss'
import { motion, useScroll, useTransform } from 'framer-motion'

const Parallex = ({ type }) => {
  const ref = useRef()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const ytext = useTransform(scrollYProgress, [0, 1], ['0%', '200%'])
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className='parallex' style={{ background: type === 'skills' ? 'Linear-gradient(180deg, #111132, #0c0c1d)' : 'Linear-gradient(180deg, #111132, #505064)', }} >

      <motion.h1 style={{ y: ytext }} >{type === 'skills' ? 'What I know ?' : 'What I Did ?'}</motion.h1>
      <motion.div className="mountains"></motion.div>
      <motion.div className="planets" style={{ y: yBg, backgroundImage: `url(${type === 'skills' ? '/planets.png' : '/sun.png'})` }} ></motion.div>
      <motion.div style={{ x: yBg }} className="stars"></motion.div>
    </div>
  )
}

export default Parallex
