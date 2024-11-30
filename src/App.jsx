import { useState } from 'react';
import './app.scss'
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Parallex from './components/parallex/Parallex';
import Skills from './components/skills/Skills';
import AnimCursor from './components/AnimCursor';
import Contact from './components/contact/Contact';

import Cursor from './components/cursor/Cursor';

const App = () => {
  return <>
    <Cursor />
    <AnimCursor />
    <div>
      <section id='Homepage'> <Navbar /> <Hero /> </section>

      <section id='Skills' ><Parallex type='skills' /></section>
      <section><Skills /></section>

      <section id='Portfolio'><Parallex type='portfolio' /></section>
      <section id='Projects'>Portfolio1</section>
      {/* <section>Portfolio2</section>
      <section>Portfolio3</section> */}

      <section id='Contact'><Contact /></section>
    </div>;
  </>
};

export default App;
