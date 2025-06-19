
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2, Edit3, Save, XCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const UserManagementTab = ({ portfolioData, updatePortfolioData }) => {
  const { toast } = useToast();
  const [users, setUsers] = useState(portfolioData.adminUsers || []);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  const handleInputChange = (e, userId) => {
    const { name, value } = e.target;
    if (userId === 'new') {
      setNewUser(prev => ({ ...prev, [name]: value }));
    } else {
      setEditingUser(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password) {
      toast({ title: "Error", description: "Username and password cannot be empty.", variant: "destructive" });
      return;
    }
    if (users.some(user => user.username === newUser.username)) {
      toast({ title: "Error", description: "Username already exists.", variant: "destructive" });
      return;
    }
    const userToAdd = { ...newUser, id: uuidv4() };
    const updatedUsers = [...users, userToAdd];
    setUsers(updatedUsers);
    updatePortfolioData('adminUsers', updatedUsers);
    setNewUser({ username: '', password: '' });
    toast({ title: "Success", description: "New user added." });
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleSaveUser = () => {
    if (!editingUser.username || !editingUser.password) {
      toast({ title: "Error", description: "Username and password cannot be empty.", variant: "destructive" });
      return;
    }
    if (users.some(user => user.username === editingUser.username && user.id !== editingUser.id)) {
        toast({ title: "Error", description: "Username already exists for another user.", variant: "destructive" });
        return;
    }
    const updatedUsers = users.map(user => (user.id === editingUser.id ? editingUser : user));
    setUsers(updatedUsers);
    updatePortfolioData('adminUsers', updatedUsers);
    setEditingUser(null);
    toast({ title: "Success", description: "User details updated." });
  };

  const handleDeleteUser = (userId) => {
    if (users.length <= 1) {
      toast({ title: "Error", description: "Cannot delete the last admin user.", variant: "destructive" });
      return;
    }
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    updatePortfolioData('adminUsers', updatedUsers);
    toast({ title: "Success", description: "User deleted." });
    if (editingUser && editingUser.id === userId) {
      setEditingUser(null);
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h3>

      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New User</h4>
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => handleInputChange(e, 'new')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => handleInputChange(e, 'new')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleAddUser}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Existing Users</h4>
        {users.map(user => (
          <div key={user.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {editingUser && editingUser.id === user.id ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={editingUser.username}
                  onChange={(e) => handleInputChange(e, user.id)}
                  className="w-full md:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="New Password (optional)"
                  value={editingUser.password}
                  onChange={(e) => handleInputChange(e, user.id)}
                  className="w-full md:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveUser}
                    className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEditingUser(null)}
                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="text-gray-700 dark:text-gray-300">{user.username}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagementTab;
