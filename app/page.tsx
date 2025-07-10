import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tools from './components/Tools';
import Footer from './components/Footer';
import WhatWeProvide from './components/WhatWeProvide';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhatWeProvide />
      <Tools />
      <Footer />
    </div>
  );
}