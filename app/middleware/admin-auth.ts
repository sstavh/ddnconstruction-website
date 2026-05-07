export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const loggedIn = localStorage.getItem('adminLogged') === 'true'
    if (!loggedIn) {
      return navigateTo('/admin/adm')
    }
  }
})
