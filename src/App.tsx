import Toolbar from './components/Toolbar/Toolbar.tsx';
import QuotePage from './containers/QuotePage/QuotePage.tsx';
import AddQuotesPage from './containers/AddQuotesPage/AddQuotesPage.tsx';
import PageNoFoundPicture from '../src/images/404PageNotFound.jpg';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
     <header>
       <Toolbar />
     </header>
      <main>
        <Routes>
          <Route path="/" element={
            <QuotePage />
          }/>
          <Route path="/addquotes" element={
            <AddQuotesPage />
          }/>
          <Route path="*" element={
            <div className="container-fluid pic-container text-center mt-5">
              <img
                className="pic-notfound w-50 h-50"
                src={PageNoFoundPicture}
                alt="Page Not Found" />
            </div>
          }/>
        </Routes>
      </main>
    </>
  );
}

export default App;