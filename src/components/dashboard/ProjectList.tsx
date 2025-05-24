
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/project';
import { Edit, Trash } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600';
      case 'completed':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'on-hold':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const isOverdue = (dueDate: Date) => {
    return new Date() > dueDate;
  };

  if (projects.length === 0) {
    return (
      <Card className="card-glass">
        <CardContent className="p-8 text-center">
          <p className="text-gray-400">No projects found. Create your first project to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="card-glass hover:border-infi-gold/40 transition-colors">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg truncate pr-2">{project.name}</CardTitle>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Due Date:</span>
                <span className={isOverdue(project.dueDate) && project.status !== 'completed' ? 'text-red-400' : 'text-white'}>
                  {format(project.dueDate, 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Created:</span>
                <span className="text-white">{format(project.createdAt, 'MMM dd, yyyy')}</span>
              </div>
            </div>

            {isOverdue(project.dueDate) && project.status !== 'completed' && (
              <Badge variant="destructive" className="w-full justify-center">
                Overdue
              </Badge>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(project)}
                className="flex-1 border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(project.id)}
                className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <Trash className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
