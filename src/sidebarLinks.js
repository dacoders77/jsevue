export default [
  {
    name: 'Dashboard',
    icon: 'ti-panel',
    path: '/dashboard'
  },
  {
    name: 'Chart',
    icon: 'ti-bar-chart-alt',
    path: '/chart'
  },
  {
    name: 'Bots',
    icon: 'ti-files',
    path: '/dashboard'
  },
  {
    name: 'Settings',
    icon: 'ti-settings',
    collapsed: true,
    children: [
      {
        name: 'Exchanges',
        path: '/exchanges'
      },
      {
        name: 'Accounts',
        path: '/accounts'
      },
      {
        name: 'Symbols',
        path: '/settings'
      }]
  },
  {
    name: 'Strategies',
    icon: 'ti-pulse',
    collapsed: true,
    children: [
      {
        name: 'Price channel',
        path: '/chart'
      },
      {
        name: 'MACD',
        path: '/chart1'
      }]
  }
]
