import { Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import Classes from './pages/Classes';
import PumpTraining from './pages/PumpTraining';
import CGM from './pages/CGM';
import Providers from './pages/Providers';
import Coverage from './pages/Coverage';
import Recipes from './pages/Recipes';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="classes" element={<Classes />} />
        <Route path="pump-training" element={<PumpTraining />} />
        <Route path="cgm" element={<CGM />} />
        <Route path="providers" element={<Providers />} />
        <Route path="coverage" element={<Coverage />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
