export interface Example {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'advanced' | 'business' | 'validation';
  schema: any;
  customSchema?: any;
  component: React.ComponentType;
}

export interface ExampleCategory {
  id: string;
  title: string;
  description: string;
  examples: Example[];
}
