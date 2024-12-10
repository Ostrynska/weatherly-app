import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import SharedLayout from '../src/components/SharedLayout.jsx';

const MainPage = lazy(() => import('./pages/Home/Home'));
const DetailsPage = lazy(() => import('./pages/Details/Details'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<MainPage />} />
        <Route path=":id" element={<DetailsPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
