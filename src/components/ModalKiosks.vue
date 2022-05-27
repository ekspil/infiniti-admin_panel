<template>
  <form
    class="card auth-card modal modal-kiosk style"
    id="modal-kiosk"
    @submit.prevent="save()"
  >
    <div class="card-content">
      <span class="card-title">Киоск</span>
      <table>
        <tr>
          <td>
            <div id="kioskName" class="input-field">
              <input
                id="name"
                type="text"
                class="validate"
                v-model="kiosk.name"
              />
              <label for="name">Имя</label>
              <small v-if="false" class="helper-text invalid">Name</small>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="input-field">
              <input
                id="uid"
                type="text"
                class="validate"
                v-model="kiosk.uid"
              />
              <label for="uid">Пользовательское название</label>
              <small v-if="false" class="helper-text invalid">User id</small>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="input-field">
              <input
                id="key"
                type="text"
                class="validate"
                v-model="kiosk.key"
              />
              <label for="key">Key</label>
              <small v-if="false" class="helper-text invalid">Key</small>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="input-field">
              <select ref="selectprodkiosk" multiple v-model="kiosk.stops">
                <option value="" disabled selected>Выберете нужные</option>
                <option
                  v-for="item of products"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.name }}</option
                >
              </select>
              <label>Товары на стопе</label>
            </div>
          </td>
        </tr>
      </table>
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
  name: "Modal",
  props: ["kiosk", "products"],
  data: () => ({
    modal: {},
    interval: null
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      const ok = await this.$store.dispatch("saveKiosk", this.kiosk);
      if (ok) {
        this.close();
        return;
      }
      return ok;
    }
  },
  async mounted() {
    this.select = window.M.FormSelect.init(this.$refs.selectprodkiosk);

    window.M.updateTextFields();
  }
};
</script>

<style scoped>

.style {
  width: 500px;
}
.modal-kiosk {
  overflow: visible;
}

</style>
