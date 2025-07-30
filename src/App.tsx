import { Routes, Route } from 'react-router-dom';
import ShopHub from './ShopHub';
import UserAccount from './pages/UserAccount';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShopHub />} />
      <Route path="/user-account" element={<UserAccount />} />
    </Routes>
  );
}

export default App;