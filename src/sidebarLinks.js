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
    children: [
      {
        name: 'Chart',
        path: '/chart'
      },
      {
        name: 'Chart1',
        path: '/chart1'
      },
      {
        name: 'Settings',
        path: '/settings'
      }]
  }
]
