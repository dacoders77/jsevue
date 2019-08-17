/* eslint-disable */

import DashboardLayout from 'src/components/Dashboard/Layout/DashboardLayout.vue'
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import DashboardJse from 'src/components/Jse/DashboardJse.vue'
import Chart from 'src/components/Jse/Chart.vue'
import Settings from 'src/components/Jse/Settings.vue'
import Exchanges from 'src/components/Jse/Exchanges.vue'
import Accounts from 'src/components/Jse/Accounts.vue'
import Symbols from 'src/components/Jse/Symbols.vue'
import Bots from 'src/components/Jse/Bots.vue'
import Strategies from 'src/components/Jse/Trading/Strategies.vue'
import Que from 'src/components/Jse/Que.vue'
import Logs from 'src/components/Jse/Logs.vue'
import Users from 'src/components/Jse/Users.vue'
var logViewerUrl = require('../../config/bot').default.LOG_VIEWER_URL;

export const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    meta: {
      requiresAuth: true // Will be handled in general.js for router.beforeEach
    },
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardJse
      },
      {
        path: 'chart',
        name: 'Chart',
        component: Chart
      },
      {
        path: 'settings2',
        name: 'Settings',
        //component: Settings
      },
      {
        path: 'exchanges',
        name: 'Exchanges',
        component: Exchanges
      },
      {
        path: 'accounts',
        name: 'Accounts',
        component: Accounts
      },
      {
        path: 'symbols',
        name: 'Symbols',
        component: Symbols
      },
      {
        path: 'bots',
        name: 'Bots',
        component: Bots
      },
      {
        path: 'strategies',
        name: 'Strategies',
        component: Strategies
      },
      {
        path: 'log',
        beforeEnter() {location.href = logViewerUrl}
      },
      {
        path: 'que',
        name: 'Que',
        component: Que
      },
      {
        path: 'logs',
        name: 'Log-viewer',
        component: Logs
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings
      },
      {
        path: 'users',
        name: 'Users',
        component: Users
      }
    ]
  }
]

export default routes
