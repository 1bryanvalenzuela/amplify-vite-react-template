import '@aws-amplify/ui-react/styles.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import "boxicons/css/boxicons.min.css";
import Header from './components/Header';
import Data from "./Data"
import Home from "./pages/Home"
import Perfil from "./pages/Perfil"
import Test from "./Test"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="data" element={<Data />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="test" element={<Test />} />
    </Route>
  )
)

const App: React.FC = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
