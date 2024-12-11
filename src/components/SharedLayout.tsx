import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header/Header.tsx';
import Footer from './Footer/Footer.tsx';

const SharedLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={"loading!"}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default SharedLayout;
