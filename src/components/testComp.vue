<template>
  <div>  <input type='text' v-model='email' />
    ...
    <input type='password' v-model='password' />
    <button @click='login'>Login</button></div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$emit('login', {
        email: this.email,
        password: this.password
      })
    }
  }
};
</script>

<style scoped>

</style>
