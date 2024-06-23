import '@aws-amplify/ui-react/styles.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Data from "./pages/Data"
import Home from "./pages/Home"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="data" element={<Data />} />
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
