'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffTasksPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Review December 15th wedding booking',
      description: 'Check all details and confirm with client',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-12-10',
      assignedTo: 'Ahmed Hassan',
      category: 'booking'
    },
    {
      id: 2,
      title: 'Update hall availability calendar',
      description: 'Mark unavailable dates for maintenance',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-12-08',
      assignedTo: 'Ahmed Hassan',
      category: 'operations'
    },
    {
      id: 3,
      title: 'Respond to support ticket #ST-2024-045',
      description: 'Customer inquiry about catering options',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-12-07',
      assignedTo: 'Ahmed Hassan',
      category: 'support'
    },
    {
      id: 4,
      title: 'Upload new gallery photos',
      description: 'Add photos from recent corporate event',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-12-05',
      assignedTo: 'Ahmed Hassan',
      category: 'content'
    }
  ])

  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: 'operations'
  })

  console.log('mavera-hall-staff-tasks', new Date().toISOString(), 'Staff tasks page rendered')

  const handleStatusChange = (taskId: number, newStatus: string) => {
    console.log('mavera-hall-staff-tasks-status', new Date().toISOString(), `Task ${taskId} status changed to ${newStatus}`)
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const handleDeleteTask = (taskId: number) => {
    console.log('mavera-hall-staff-tasks-delete', new Date().toISOString(), `Task ${taskId} deleted`)
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleCreateTask = () => {
    console.log('mavera-hall-staff-tasks-create', new Date().toISOString(), 'Creating new task')
    if (newTask.title && newTask.description && newTask.dueDate) {
      const task = {
        id: Date.now(),
        ...newTask,
        status: 'pending',
        assignedTo: 'Ahmed Hassan'
      }
      setTasks([...tasks, task])
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', category: 'operations' })
      setShowNewTaskForm(false)
    }
  }

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-tasks-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleViewCalendar = () => {
    console.log('mavera-hall-staff-tasks-calendar', new Date().toISOString(), 'View calendar clicked')
    router.push('/staff/calendar')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const pendingTasks = tasks.filter(task => task.status === 'pending').length
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length
  const completedTasks = tasks.filter(task => task.status === 'completed').length

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Tasks</h1>
            <p className="body-regular text-text-secondary">
              Manage your daily tasks and responsibilities
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={handleViewCalendar}
              className="btn-secondary"
            >
              View Calendar
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Task Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-yellow-600 mb-2">{pendingTasks}</h3>
            <p className="body-regular">Pending</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-blue-600 mb-2">{inProgressTasks}</h3>
            <p className="body-regular">In Progress</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-green-600 mb-2">{completedTasks}</h3>
            <p className="body-regular">Completed</p>
          </div>
        </div>

        {/* Actions */}
        <div className="service-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowNewTaskForm(true)}
                className="btn-primary"
              >
                Create New Task
              </button>
              <button 
                onClick={() => router.push('/staff/tasks/templates')}
                className="btn-secondary"
              >
                Task Templates
              </button>
            </div>
            <div className="flex space-x-3">
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Categories</option>
                <option>Booking</option>
                <option>Operations</option>
                <option>Support</option>
                <option>Content</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* New Task Form */}
        {showNewTaskForm && (
          <div className="service-card p-6 mb-8">
            <h3 className="subsection-title mb-4 text-primary">Create New Task</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block body-regular font-semibold mb-2">Task Title</label>
                <input 
                  type="text" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Category</label>
                <select 
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="operations">Operations</option>
                  <option value="booking">Booking</option>
                  <option value="support">Support</option>
                  <option value="content">Content</option>
                </select>
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Priority</label>
                <select 
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Due Date</label>
                <input 
                  type="date" 
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block body-regular font-semibold mb-2">Description</label>
                <textarea 
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter task description"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleCreateTask}
                className="btn-primary"
              >
                Create Task
              </button>
              <button 
                onClick={() => setShowNewTaskForm(false)}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="service-card p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      {task.category}
                    </span>
                  </div>
                  <h3 className="subsection-title mb-2">{task.title}</h3>
                  <p className="body-regular text-text-secondary mb-3">{task.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    <span>Assigned to: {task.assignedTo}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <select 
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="btn-outline text-sm text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="service-card p-12 text-center">
            <h3 className="subsection-title mb-4 text-primary">No Tasks</h3>
            <p className="body-regular text-text-secondary">
              You have no tasks assigned. Create a new task to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 