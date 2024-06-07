import React from 'react'
import {motion} from 'framer-motion'

const variants = {
  open:{
    transition:{
      staggerChildren:0.1,
    },
  },
  closed:{
    transition:{
      staggerChildren:0.01,
      staggerDirection:-1,
    },
  },
}

const itemVariants = {
  open:{
   y:0,
   opacity:1
  },
  closed:{
    y:50,
    opacity:0,
  },
}

const Links = () => {

  const items = ['Homepage', "Skills", "Portfolio", "Contact", "About"]

  return (
    <motion.div className='links' variants={variants} >{items.map((item, index) => (<motion.a key={index} href={`#${item}`} variants={itemVariants} whileHover={{scale:1.3}} whileTap={{scale: 1}} >{item}</motion.a>))}</motion.div>
  )
}

export default Links
