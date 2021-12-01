<template>
    <div class="item__row">
      <div class="form__counter">
        <button type="button" aria-label="Убрать один товар">
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
  </div>
</template>

<script>
export default {
  props: ['productId', 'amount'],
  methods: {
    increment() {
      this.$store.commit(
        'incrementProduct',
        {
          productId: this.productId,
          amount:  this.amount
        })
    }
  }
};
</script>

<style scoped>

</style>
