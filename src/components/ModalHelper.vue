<template>
  <form
    class="card auth-card modal modal-helper"
    id="modal-helper"
    @submit.prevent="save()"
  >
    <div class="card-content">
      <span class="card-title">Подсказка</span>
      <div class="input-field">
        <input id="pname" type="text" v-model.trim="helper.name" />
        <label for="pname">Наименование</label>
        <small v-if="false" class="helper-text invalid"
          >Должно быть заполнено</small
        >
      </div>

      <div class="input-field">
        <input id="pnamep" type="text" v-model.trim="helper.priority" />
        <label for="pnamep">Приоритет</label>
        <small v-if="false" class="helper-text invalid"
          >Должно быть заполнено</small
        >
      </div>

<!--      <div class="input-field">-->
<!--        <input type="text" v-model.trim="helper.price" />-->
<!--        <label for="pname">Цена</label>-->
<!--        <small v-if="false" class="helper-text invalid"-->
<!--          >Должно быть заполнено</small-->
<!--        >-->
<!--      </div>-->
      <div class="input-field">
        <select ref="selectprod" multiple v-model="helper.items">
          <option value="" disabled selected>Выберете нужные</option>
          <option v-for="item of products" :key="item.id" :value="item.id">{{
            item.name
          }}</option>
        </select>
        <label>Показывать для</label>
      </div>
      <div class="input-field">
        <select ref="selectprode" multiple v-model="helper.exclude">
          <option value="" disabled selected>Выберете нужные</option>
          <option v-for="item of products" :key="item.id" :value="item.id">{{
            item.name
          }}</option>
        </select>
        <label>Не показывать если выбран</label>
      </div>

    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Сохранить
          <i class="material-icons right">send</i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "ModalHelper",
  props: ["products", "helper"],
  data: () => ({
    modal: {},
    select: null,
    select2: null
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      this.helper.priority = Number(this.helper.priority )
      const ok = await this.$store.dispatch("saveHelper", this.helper);
      if (ok) {
        this.close();
        return;
      }
      return ok;
    }
  },
  async mounted() {
    this.select = window.M.FormSelect.init(this.$refs.selectprod);
    this.select3 = window.M.FormSelect.init(this.$refs.selectprode);
    this.select2 = window.M.FormSelect.init(this.$refs.selectgroup);
    window.M.updateTextFields();
  }
};
</script>

<style scoped>
.modal-product {
  overflow: visible;
}
</style>
