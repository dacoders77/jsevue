export default [
  {
    name: 'Dashboard',
    icon: 'ti-panel',
    path: '/dashboard'
  },
  {
    name: 'Trading',
    icon: 'ti-settings',
    collapsed: false,
    children: [{
      name: 'Chart',
      path: '/chart'
    },
      {
        name: 'Settings',
        path: '/settings'
      }]
  }
]
