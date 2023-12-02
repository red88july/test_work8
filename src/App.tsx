import Toolbar from './components/Toolbar/Toolbar.tsx';
import HomePage from './containers/HomePage/HomePage.tsx';
import AddPage from './containers/AddPage/AddPage.tsx';
import PostPage from './containers/PostPage/PostPage.tsx';
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
            <HomePage />
          }/>
          <Route path="/posts" element={
            <HomePage />
          }/>
          <Route path="/posts/:postId" element={
           <PostPage />
          }/>
          <Route path="/add" element={
            <AddPage />
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