/* eslint-disable */

import DashboardLayout from 'src/components/Dashboard/Layout/DashboardLayout.vue'
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import DashboardJse from 'src/components/Jse/DashboardJse.vue'
import Chart from 'src/components/Jse/Chart.vue'
import Settings from 'src/components/Jse/Settings.vue'
import Exchnages from 'src/components/Jse/Exchanges.vue'
import Accounts from 'src/components/Jse/Accounts.vue'
import Symbols from 'src/components/Jse/Symbols.vue'
import Bots from 'src/components/Jse/Bots.vue'
import Bots from 'src/components/Jse/DashboardCard.vue'

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
        path: 'settings',
        name: 'Settings',
        component: Settings
      },
      {
        path: 'exchanges',
        name: 'Exchanges',
        component: Exchnages
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
      }

    ]
  },

  /*
  {
    path: '/login',
    component: () => import('src/components/Dashboard/Views/Pages/Login.vue'),
  },
  {
    path: '/',
    // DashboardLayout is a start component. components/Dashboard/Layout/Content.vue is imported into it.
    // Then Content.vue has <router-view></router-view> tag into which other components are loaded.
    component: () => import('src/components/Dashboard/Layout/DashboardLayout.vue'),
    // There is another <router-view> in Content.vue
    // This is a default route used only after login action. It does not contain any content
    redirect: '/dashboard',
    meta: {
      requiresAuth: true // Is handled in general.js for router.beforeEach
    }
  },
  {
    path: '/',
    // Child components will be loaded into <router-view></router-view> located in Content.vue
    // Which is imported into DashboardLayout.vue
    component: () => import('src/components/Dashboard/Layout/DashboardLayout.vue'),
    children: [
      {
        // This is the redirect route after login action. It is loaded right after login
        // The path will be: / + dashboard
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('src/components/Jse/DashboardJse.vue')
      },
      {
        path: 'chart',
        name: 'Chart',
        component: () => import('src/components/Jse/Chart.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('src/components/Jse/Settings.vue')
      }
    ]
  }*/

]

export default routes
