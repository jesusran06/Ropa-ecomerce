export default [
  // { heading: 'Apps & Pages' },

  {
    title: 'Configuración',
    icon: { icon: 'tabler-settings' },
    children: [
      { title: 'Gestión de Perfiles', to: 'profile' },
      { title: 'Usuarios', to: 'apps-user-list' },
      { title: 'Catálagos de Sistema', to: 'catalog' },
    ],
  },
  {
    title: 'Catalógo',
    icon: { icon: 'carbon:task-complete' },
    children: [
      { title: 'Consulta de Producto', to: 'products' },
      { title: 'Test', to: 'test' },
    ],
  },
]
