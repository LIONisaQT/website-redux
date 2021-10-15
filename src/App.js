import './App.css';
import Navbar from './Navbar';
import AboutMeSection from './Sections/AboutMeSection';
import GridSection from './Sections/GridSection';
import IntroSection from './Sections/IntroSection';

function App() {
  return (
    <div className="App">
      <Navbar />
      <IntroSection />
      <GridSection id='games' section='games' />
      <GridSection id='engineering' section='engineering' />
      <GridSection id='resume' section='resume' />
      <AboutMeSection id='about' />
    </div>
  );
}

export default App;
