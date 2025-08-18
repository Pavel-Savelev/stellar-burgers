import { ConstructorPage, Feed, Login, Register, ForgotPassword, ResetPassword, NotFound404,Profile,ProfileOrders, } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader,OrderInfo,IngredientDetails,Modal } from '@components';

import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from '../ui/protect-router';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<ProtectedRoute><Login /></ProtectedRoute>} />
        <Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path='/forgot-password' element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
        <Route path='/reset-password' element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
        <Route path='/profile/orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='*' element={<NotFound404 />} />

        {/* <Route path='/feed/:number' element={<Modal>{<OrderInfo/>}</Modal>} />
        <Route path='/ingredients/:id' element={<Modal><IngredientDetails/></Modal>} />
        <Route path='/profile/orders/:number' element={<Modal><OrderInfo/></Modal>} /> */}
    </Routes>
  </div>
);

// TODO Potected router
// links +
//  Означает layout что все внуттри будет иметь свою шапку и тд

export default App;
