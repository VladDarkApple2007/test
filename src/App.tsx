import { Routes, Route } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { ArticlePage } from '@/pages/ArticlePage';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Route>
    </Routes>
  );
}

export default App;
