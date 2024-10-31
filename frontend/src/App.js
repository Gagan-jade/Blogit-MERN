import './App.css';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Articles from './pages/Articles';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ArticleInfo from './pages/ArticleInfo';
import userContext from './context/userContext';
import PageNotFound from './pages/NotFoundPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddArticle from './pages/AddArticle';
import ProtectedRoute from './context/authContext';


function App() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userName, setUserName] = useState(() => {
    if (localStorage.getItem('userName'))
      return localStorage.getItem('userName')
    else
      return "Guest"
  })

  useEffect(() => {
    localStorage.setItem('userName', userName);
    if(userName !== "Guest")
      setIsAuthorized(true)
  }, [userName])
  return (


    <ProtectedRoute.Provider value={{ isAuthorized, setIsAuthorized }}>
      <userContext.Provider value={{ userName, setUserName }}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/articles/:articleName" element={<ArticleInfo />} />

              <Route path="/articles/addArticle" element={<AddArticle />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </userContext.Provider>
    </ProtectedRoute.Provider>
  );
}

export default App;
