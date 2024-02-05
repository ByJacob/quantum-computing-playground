import './App.css';
import Menu from './components/Menu';

function App() {
  return (
    <div className="flex flex-row min-h-full fixed w-full bg-black">
      <div className="basis-1/5 bg-neutral-900">
        <Menu/>
      </div>
      <div className="basis-4/5">Page Content</div>
    </div>
  );
}

export default App;
