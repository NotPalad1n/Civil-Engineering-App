import Hero from './components/Hero';
import Tools from './components/Tools';
import WhatWeProvide from './components/WhatWeProvide';
import BackToTop from './components/BackToTop';

export default function Home() {

  return (
    <div>
      <Hero />
      <WhatWeProvide />
      <Tools />
      <BackToTop />
    </div>
  );
}