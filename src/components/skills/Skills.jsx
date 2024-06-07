import React from 'react'
import './skills.scss'
import { useMediaQuery } from '@mui/material';
import { RiHtml5Line } from "react-icons/ri";
import { SiCss3 } from "react-icons/si";
import { TbBrandJavascript } from "react-icons/tb";
import { RiTailwindCssLine } from "react-icons/ri";
import { RiReactjsFill } from "react-icons/ri";
import { SiRedux } from "react-icons/si";
import { TbBrandBootstrap } from "react-icons/tb";
import { TbBrandNodejs } from "react-icons/tb";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { motion } from 'framer-motion';


// const cardVariant = {
//     initialFront: { y: '-230px', scale: 0.5, opacity: 0 },
//     animateFront: { y: 0, scale: 1, opacity: 1, transition: { type: 'spring', bouncy: 1.5, stiffness: 200, duration: 1 } },

//     initialBack: { x: '230px', scale: 0.5, opacity: 0 },
//     animateBack: { x: '0', scale: 1, opacity: 1, transition: { type: 'spring', bouncy: 1.5, duration: 1 } },
// }

const Skills = () => {

    const isDesktop = useMediaQuery('(min-width:730px)')

    const commonTransition = { type: 'spring', bouncy: 1.5, duration: 1 }

    const cardVariant = {
        initialFront: isDesktop ? { y: '-230px', scale: 0.5, opacity: 0 } : { x: '230px', scale: 0.5, opacity: 0 },
        animateFront: isDesktop ? { y: 0, scale: 1, opacity: 1, transition: { ...commonTransition, stiffness: 200 } } : { x: '0', scale: 1, opacity: 1, transition: commonTransition },
        initialBack: { x: '230px', scale: 0.5, opacity: 0 },
        animateBack: { x: '0', scale: 1, opacity: 1, transition: commonTransition },
    }

    return (
        <div className='skills'>
            <div className='head'>
                <div className='headText'>my skills<span></span></div>
                <p>here are some skills on which I have been working on for the past 1 year </p>
            </div>

            <div className="cardContainer">
                <div className='card1'>
                    <motion.div className="card" variants={cardVariant} initial='initialFront' whileInView='animateFront' >
                        <div className="frontend"><h2>Frontend development</h2></div>
                        <div className="frontendSkills">
                            <div className="flex level css"><SiCss3 />css</div>
                            <div className="flex level react"><RiReactjsFill />react.js</div>
                            <div className="flex level html"><RiHtml5Line />HTML</div>
                            <div className="flex level javascript"><TbBrandJavascript />javascript</div>
                            <div className="flex level tailwindcss"><RiTailwindCssLine />tailwindcss</div>
                            <div className="flex level redux"><SiRedux />redux</div>
                            <div className="flex level bootstrap"><TbBrandBootstrap /> bootstrap</div>
                        </div>
                    </motion.div>
                </div>
                <div className="card2">
                    <motion.div className="card" variants={cardVariant} initial='initialBack' whileInView='animateBack' >
                        <div className="backend"><h2>backend development</h2></div>
                        <div className="backendSkills">
                            <div className="flex level css"><TbBrandNodejs />node.js</div>
                            <div className="flex level react"><SiExpress />express.js</div>
                            <div className="flex level html"><SiMongodb />mongodb</div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </div>
    )
}

export default Skills
