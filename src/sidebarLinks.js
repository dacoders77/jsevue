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
    path: '/bots'
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
        path: '/symbols'
      }]
  },
  {
    name: 'Trading',
    icon: 'ti-pulse',
    collapsed: true,
    children: [
      {
        name: 'Strategies',
        path: '/strategies'
     }
   ]
  },
  {
    name: 'System',
    icon: 'ti-power-off',
    collapsed: true,
    children: [
      {
        name: 'Logs',
        path: '/log'
      },
      {
        name: 'Que',
        path: '/que'
      }
    ]
  }
]
