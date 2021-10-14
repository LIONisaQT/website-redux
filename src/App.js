import './App.css';
import AboutMeSection from './Sections/AboutMeSection';
import GridSection from './Sections/GridSection';
import HeaderSection from './Sections/HeaderSection';

function App() {
  return (
    <div className="App">
      <HeaderSection />
      <GridSection section='games' />
      <GridSection section='engineering' />
      <GridSection section='resume' />
      <AboutMeSection />
    </div>
  );
}

export default App;
