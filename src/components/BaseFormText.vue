<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" :type="type" v-model="dataValue" name="name" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'
import BaseFormField from '@/components/BaseFormField'

export default {
  props: {
    type: {
      default: 'text'
    }
  },
  components: {
    BaseFormField
  },
  mixins: [FormFieldMixin]
}
</script>

<style scoped>

</style>
