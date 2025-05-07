import { useState } from 'react';
import { ClipboardDocumentListIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
}

const initialTodos: Todo[] = [
  {
    id: 1,
    title: 'Review Product Roadmap',
    description: 'Review and provide feedback on the Q2 product roadmap',
    dueDate: '2024-03-25',
    priority: 'High',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Team Meeting',
    description: 'Weekly team sync to discuss progress and blockers',
    dueDate: '2024-03-22',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Documentation Update',
    description: 'Update technical documentation for new features',
    dueDate: '2024-03-28',
    priority: 'Low',
    status: 'Pending',
  },
];

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<Omit<Todo, 'id' | 'status'>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
  });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    const todo: Todo = {
      id: todos.length + 1,
      ...newTodo,
      status: 'Pending',
    };

    setTodos([...todos, todo]);
    setNewTodo({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
    });
  };

  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: Todo['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            To-Do List
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Manage your tasks and company objectives
          </p>
        </div>

        <div className="mt-12">
          <form onSubmit={handleAddTodo} className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Task title"
                />
              </div>
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value as Todo['priority'] })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <PlusIcon className="mr-2 h-5 w-5" />
                  Add Task
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{todo.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{todo.description}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <span className="text-xs text-gray-500">Due: {todo.dueDate}</span>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                        {todo.priority}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(todo.status)}`}>
                        {todo.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200">
                      Edit
                    </button>
                    <button className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 