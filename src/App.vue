<template>
  <router-view />

</template>

<script>
import MainPage from './pages/MainPage'
import ProductPage from './pages/ProductPage'
import NotFound from '@/pages/NotFound'
import eventBus from '@/eventBus'

const routes = {
    main: 'MainPage',
  product: 'ProductPage'
}

export default {

}
</script>
