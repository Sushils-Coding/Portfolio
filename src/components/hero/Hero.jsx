import React from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import './hero.scss'

const textVariants = {
    initial: {
        x: -500, opacity: 0,
    },
    animate: {
        x: 0, opacity: 1, transition: { duration: 1, staggerChildren: 0.1 },
    },
    scrollButton: {
        opacity: 0,
        y: 10,
        transition: {
            duration: 1,
            repeat: Infinity,
        }
    }
}

const sliderVariants = {
    initial: {
        x: 0,
    },
    animate: {
        x: '-220%',
        transition: {
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'mirror',
        }
    },

}

const Hero = () => {
    const [typeEffect] = useTypewriter({
        words: [' Full Stack Developer', 'Programmer'],
        loop: {},
        typeSpeed: 150,
        deleteSpeed: 40,
        delaySpeed: 30,
    })
    return (
        <div className='hero'>
            <div className="wrapper">
                <motion.div className="textContainer" variants={textVariants} initial='initial' animate='animate' >
                    <motion.h2 variants={textVariants} >Sushil Verma</motion.h2>
                    <motion.h1 variants={textVariants} > I'm a <motion.span variants={textVariants} style={{ fontSize: '50px', color: 'green', fontWeight: 'bold' }} >{typeEffect} <Cursor /></motion.span> </motion.h1>
                    <motion.div variants={textVariants} className="buttons">
                        <motion.button variants={textVariants} >See my latest Works</motion.button>
                        <motion.button variants={textVariants} >Contact Me</motion.button>
                    </motion.div>
                    <motion.img variants={textVariants} animate='scrollButton' src="/scroll.png" alt="scroll" />
                </motion.div>
            </div>
            <motion.div variants={sliderVariants} initial='initial' animate='animate' className="slidingTextContainer">Web Developer React Dev</motion.div>
            <motion.div className="imgContainer"><img style={{ height: '100%' }} src="/hero1.png" alt="hero" /></motion.div>
        </div>
    )
}

export default Hero
