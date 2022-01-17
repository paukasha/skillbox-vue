<template>

      <div class="form__counter">
        <button :disabled="counter<=1"  type="button" aria-label="Убрать один товар" @click.prevent="counter--">
          <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
          </svg>
        </button>

        <input type="text" v-model.number="counter">

        <button type="button" aria-label="Добавить один товар" @click.prevent="counter++">
          <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-plus"></use>
          </svg>
        </button>
      </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 1,
    }
  },
  props: [ 'amount'],
  created() {
    this.counter = this.amount
  },
  watch: {
    counter(value) {
      this.$emit('update:amount', value)
    }
  },
};
</script>

<style scoped>
.form__counter button,
.form__counter input{
  height: 100%;
}
</style>
