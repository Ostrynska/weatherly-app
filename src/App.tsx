import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import SharedLayout from './components/SharedLayout.tsx';
import React from 'react';

const MainPage = lazy(() => import('./pages/Home/Home.tsx'));
const DetailsPage = lazy(() => import('./pages/Details/Details.tsx'));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<MainPage />} />
        <Route path=":id" element={<DetailsPage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Route>
    </Routes>
  );
};

export default App;
