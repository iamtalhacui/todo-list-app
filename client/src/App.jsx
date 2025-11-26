
import MainBoard from "./components/MainBoard.jsx";
import Navbar from "./components/Navbar.jsx";


const App = () => {
  return (
    <div className="w-full md:h-screen h-auto overflow-hidden">
     
      <Navbar/>
      <MainBoard />
    </div>
  );
};

export default App;
