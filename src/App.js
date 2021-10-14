import './App.css';
import GridSection from './Sections/GridSection';
import SimpleTextSection from './Sections/SimpleTextSection';

function App() {
  return (
    <div className="App">
      <SimpleTextSection />
      <GridSection section='games' />
      <GridSection section='engineering' />
      <GridSection section='resume' />
      <SimpleTextSection />
    </div>
  );
}

export default App;
