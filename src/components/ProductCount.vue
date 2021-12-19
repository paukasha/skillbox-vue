<template>

      <div class="form__counter">
        <button :disabled="amount<=1"  type="button" aria-label="Убрать один товар" @click="decrement">
          <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
          </svg>
        </button>

        <input type="text" v-model.number="amount">

        <button type="button" aria-label="Добавить один товар" @click.prevent="increment">
          <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-plus"></use>
          </svg>
        </button>
      </div>

</template>

<script>
export default {
  props: ['amount'],
  methods: {
    increment() {
      this.$emit('update:amount',this.amount + 1)

    },
    decrement() {
      this.$emit('update:amount',this.amount - 1 )
    }
  }
};
</script>

<style scoped>
.form__counter button,
.form__counter input{
  height: 100%;
}
</style>
