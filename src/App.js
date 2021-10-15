import './App.css';
import AboutMeSection from './Sections/AboutMeSection';
import GridSection from './Sections/GridSection';
import IntroSection from './Sections/IntroSection';

function App() {
  return (
    <div className="App">
      <IntroSection />
      <GridSection section='games' />
      <GridSection section='engineering' />
      <GridSection section='resume' />
      <AboutMeSection />
    </div>
  );
}

export default App;
