
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending' | 'on-hold';
  dueDate: Date;
  createdAt: Date;
}

export interface CreateProjectData {
  name: string;
  description: string;
  dueDate: Date;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  status?: Project['status'];
}
