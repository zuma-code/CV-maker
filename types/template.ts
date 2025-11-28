// Tipos para el sistema de plantillas

export type TemplateName = 'modern' | 'classic' | 'creative' | 'minimal' | 'professional';

export interface Template {
  id: TemplateName;
  name: string;
  description: string;
  preview: string; // URL de imagen de preview
  category: 'modern' | 'traditional' | 'creative' | 'minimal' | 'professional';
}


