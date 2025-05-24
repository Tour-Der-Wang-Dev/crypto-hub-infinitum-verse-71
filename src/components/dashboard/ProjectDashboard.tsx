
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/types/project';
import { ProjectForm } from './ProjectForm';
import { ProjectList } from './ProjectList';
import { User, Plus } from 'lucide-react';

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '',
};

// Mock projects data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of the company website',
    status: 'active',
    dueDate: new Date('2024-06-15'),
    createdAt: new Date('2024-05-01'),
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Develop a mobile app for iOS and Android',
    status: 'pending',
    dueDate: new Date('2024-07-30'),
    createdAt: new Date('2024-05-10'),
  },
  {
    id: '3',
    name: 'Database Migration',
    description: 'Migrate database to new cloud infrastructure',
    status: 'completed',
    dueDate: new Date('2024-05-20'),
    createdAt: new Date('2024-04-15'),
  },
];

const ProjectDashboard = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const handleCreateProject = (projectData: { name: string; description: string; dueDate: Date }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      status: 'pending',
      createdAt: new Date(),
    };

    setProjects(prev => [...prev, newProject]);
    setShowCreateForm(false);
    
    toast({
      title: "Project Created",
      description: `"${projectData.name}" has been created successfully.`,
    });
  };

  const handleUpdateProject = (projectData: { name: string; description: string; dueDate: Date }) => {
    if (!editingProject) return;

    const updatedProjects = projects.map(project =>
      project.id === editingProject.id
        ? { ...project, ...projectData }
        : project
    );

    setProjects(updatedProjects);
    setEditingProject(null);
    
    toast({
      title: "Project Updated",
      description: `"${projectData.name}" has been updated successfully.`,
    });
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
    
    toast({
      title: "Project Deleted",
      description: `"${project?.name}" has been deleted successfully.`,
    });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-infi-dark via-infi-dark-blue to-infi-dark text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* User Info Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Project Dashboard</h1>
          <Card className="card-glass">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{mockUser.name}</p>
                  <p className="text-sm text-gray-400">{mockUser.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Project Button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">My Projects</h2>
            <p className="text-gray-400">Manage your projects and track progress</p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="gold-gradient"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Projects List */}
        <ProjectList
          projects={projects}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />

        {/* Create/Edit Project Form */}
        {(showCreateForm || editingProject) && (
          <ProjectForm
            project={editingProject}
            onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
            onCancel={() => {
              setShowCreateForm(false);
              setEditingProject(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;
