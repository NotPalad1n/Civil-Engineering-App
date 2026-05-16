import Hero from './components/Hero';
import Tools from './components/Tools';
import WhatWeProvide from './components/WhatWeProvide';
import BackToTop from './components/BackToTop';
import ContactMe from './components/ContactMe';

export default function Home() {

  return (
    <div>
      <Hero />
      <WhatWeProvide />
      <Tools />
      <ContactMe />
      <BackToTop />
    </div>
  );
}