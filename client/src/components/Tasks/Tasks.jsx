import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import KanbanBoard from './KanbanBoard';

const Tasks = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <KanbanBoard />
        </main>
      </div>
    </div>
  );
};

export default Tasks;
