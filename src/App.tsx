import { Route, Routes } from 'react-router-dom';
import { Shell } from './components/Shell';
import { TeacherProvider } from './lib/teacherCtx';
import Home from './pages/Home';
import LessonPage from './pages/Lesson';
import Practice from './pages/Practice';
import Revise from './pages/Revise';
import Homework from './pages/Homework';
import TeacherPage from './pages/Teacher';
import Settings from './pages/Settings';
import ChapterPage from './pages/Chapter';

export default function App() {
  return (
    <TeacherProvider>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/chapter/:n" element={<ChapterPage />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/revise" element={<Revise />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/homework/:id" element={<Homework />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Shell>
    </TeacherProvider>
  );
}
