export const initialCourses = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    progress: 75,
    icon_name: 'Code',
    status: 'In progress',
    duration: '8 modules',
    accent: 'cyan',
    description: 'Master advanced React concepts including higher-order components, render props, and custom hooks to build scalable applications.',
    instructor: 'Sarah Drasner',
    modules: [
      { id: '1-1', title: 'Context API and Compound Components', completed: true },
      { id: '1-2', title: 'Performance Optimization Techniques', completed: true },
      { id: '1-3', title: 'Advanced Custom Hooks', completed: true },
      { id: '1-4', title: 'State Management Patterns', completed: false },
    ]
  },
  {
    id: '2',
    title: 'TypeScript Deep Dive',
    progress: 45,
    icon_name: 'BookOpen',
    status: 'Next sprint',
    duration: '12 lessons',
    accent: 'violet',
    description: 'Take your TypeScript skills to the next level. Learn about mapped types, conditional types, and advanced type inference.',
    instructor: 'Matt Pocock',
    modules: [
      { id: '2-1', title: 'Type vs Interface', completed: true },
      { id: '2-2', title: 'Generics deep dive', completed: false },
      { id: '2-3', title: 'Utility types', completed: false },
    ]
  },
  {
    id: '3',
    title: 'Database Design',
    progress: 60,
    icon_name: 'Database',
    status: 'Practice',
    duration: '6 labs',
    accent: 'emerald',
    description: 'Learn the fundamentals of database design, normalization, and efficient querying strategies for modern web applications.',
    instructor: 'Hussein Nasser',
    modules: [
      { id: '3-1', title: 'Relational Model Basics', completed: true },
      { id: '3-2', title: 'Normalization up to 3NF', completed: true },
      { id: '3-3', title: 'Indexing Strategies', completed: false },
    ]
  },
  {
    id: '4',
    title: 'UI/UX Principles',
    progress: 85,
    icon_name: 'Palette',
    status: 'Review',
    duration: '4 projects',
    accent: 'amber',
    description: 'Discover the core principles of beautiful, accessible, and user-friendly design tailored for frontend developers.',
    instructor: 'Gary Simon',
    modules: [
      { id: '4-1', title: 'Color Theory & Typography', completed: true },
      { id: '4-2', title: 'Layouts & Spacing', completed: true },
      { id: '4-3', title: 'Micro-interactions', completed: true },
      { id: '4-4', title: 'Accessibility (a11y) basics', completed: false },
    ]
  },
];
