/* eslint-disable */
export const routes = [
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
  }

]

export default routes



