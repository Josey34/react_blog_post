import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing';
import EditPost from './EditPost'
import Layout from './Layout'
import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'

function App() {
  return (
    <>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='post'>
              <Route index element={<NewPost />} />
            </Route>
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </DataProvider>

    </>
  );
}

export default App;
