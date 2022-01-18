<template>

      <div class="form__counter">
        <button :disabled="counter<=1"  type="button" aria-label="Убрать один товар" @click.prevent="counter--">
          <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
          </svg>
        </button>


          <input  type="number" v-model.number="$v.counter.$model" >
          <div class="error" v-if="!$v.counter.between || !$v.counter.required">Введите целое положительное число от 1 до 50</div>


        <button type="button" aria-label="Добавить один товар" @click.prevent="counter++">
          <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-plus"></use>
          </svg>
        </button>

      </div>
</template>

<script>
import { required, between } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      counter: 1,
    }
  },
  validations: {
    counter: {
      required,
      between: between(1, 50),
    },

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
.form__counter input {
  height: 100%;
}

input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  display: none;
}


.form__counter {
  position: relative;
}

.error {
  position: absolute;
  width: 300px;
  left: 0;
  bottom: -16px;
  color: red;
  font-size: 10px;
}

</style>
