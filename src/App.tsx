import { Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import Classes from './pages/Classes';
import PumpTraining from './pages/PumpTraining';
import CGM from './pages/CGM';
import GLP1Training from './pages/GLP1Training';
import Providers from './pages/Providers';
import Coverage from './pages/Coverage';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Contact from './pages/Contact';
import Member from './pages/Member';
import BookingRedirect from './pages/BookingRedirect';
import ContactThankYou from './pages/ContactThankYou';
import MemberThankYou from './pages/MemberThankYou';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="classes" element={<Classes />} />
        <Route path="pump-training" element={<PumpTraining />} />
        <Route path="cgm" element={<CGM />} />
        <Route path="glp1-training" element={<GLP1Training />} />
        <Route path="providers" element={<Providers />} />
        <Route path="coverage" element={<Coverage />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/:slug" element={<RecipeDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="contact-thank-you" element={<ContactThankYou />} />
        <Route path="member" element={<Member />} />
        <Route path="member-thank-you" element={<MemberThankYou />} />
        <Route path="booking-redirect" element={<BookingRedirect />} />
      </Route>
    </Routes>
  );
}
