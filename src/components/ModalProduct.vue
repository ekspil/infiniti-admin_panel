<template>
  <form
    class="card auth-card modal modal-product"
    id="modal-product"
    @submit.prevent="save()"
  >
    <div class="card-content">
      <span class="card-title">Товар</span>
      <span
        ><img
          class=""
          v-if="product.img"
          :src="
            product.img
              ? 'http://localhost:3210/api/v1/files/download/1/' + product.img
              : '/burger.png'
          "
          height="50px"
          width="50px"
        /> </span
      ><br />
      <div class="input-field">
        <input id="pname" type="text" v-model.trim="product.name" />
        <label for="pname">Наименование</label>
        <small v-if="false" class="helper-text invalid"
          >Должно быть заполнено</small
        >
      </div>
      <div class="input-field">
        <input
          class=""
          type="file"
          id="fileImg"
          ref="fileImg"
          for="pname"
          v-on:change="handleFileUpload('fileImg')"
        />
        <label for="pname"></label>
      </div>
      <div class="input-field">
        <input type="text" v-model.trim="product.code" />
        <label for="pname">Общий код</label>
        <small v-if="false" class="helper-text invalid"
          >Должно быть заполнено</small
        >
      </div>
      <div class="input-field">
        <input type="text" v-model.trim="product.price" />
        <label for="pname">Цена</label>
        <small v-if="false" class="helper-text invalid"
          >Должно быть заполнено</small
        >
      </div>
      <div class="input-field">
        <select ref="selectkiosk" v-model="product.kiosk">
          <option :value="null" selected>Без киоска</option>
          <option v-for="item of kiosks" :key="item.id" :value="item.name">{{
            item.uid
          }}</option>
        </select>
        <label>Выберете киоск</label>
      </div>
      <div class="input-field">
        <input
          id="Station"
          type="number"
          class="validate"
          v-model.trim="product.station"
        />
        <label for="Station">Станция</label>
        <small v-if="false" class="helper-text invalid"
          >Должно быть заполнено</small
        >
      </div>

      <div class="input-field">
        <select ref="selectgroup" v-model="product.group_id">
          <option value="" disabled selected>Выберете нужную группу</option>
          <option v-for="item of groups" :key="item.id" :value="item.id">{{
            item.name
          }}</option>
        </select>
        <label>Группа</label>
      </div>

      <div class="input-field">
        <select ref="selectset" multiple v-model="product.mods">
          <option value="" disabled selected>Выберете состав сэта</option>
          <option v-for="item of mods" :key="item.id" :value="item.id">{{
            item.name
          }}</option>
        </select>
        <label>Состав сета</label>
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
import axios from "axios";
export default {
  name: "ModalP",
  props: ["items", "product", "groups", "mods", "kiosks"],
  data: () => ({
    modal: {},
    select: null,
    select2: null,
    select3: null,
    select4: null
  }),
  methods: {
    async handleFileUpload(fileName) {
      this.file = this.$refs[fileName].files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      try {
        await axios.post(
          `http://localhost:3210/api/v1/files/upload/1/${this.file.name}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: "Bearer " + "1111111111"
            }
          }
        );
        this[fileName] = `${this.file.name}`;
        this.product.img = `${this.file.name}`;
      } catch (e) {
        console.log(e);
        alert("Ошибка загрузки");
      }
    },
    close() {
      this.$emit("close");
    },
    getMod(id) {
      return this.mods.find(i => i.id === id);
    },
    async save() {
      const ok = await this.$store.dispatch("saveProduct", this.product);
      if (ok) {
        this.close();
        return;
      }
      return ok;
    }
  },
  async mounted() {
    this.select = window.M.FormSelect.init(this.$refs.selectprod);
    this.select2 = window.M.FormSelect.init(this.$refs.selectgroup);
    this.select3 = window.M.FormSelect.init(this.$refs.selectset);
    this.select4 = window.M.FormSelect.init(this.$refs.selectkiosk);
    window.M.updateTextFields();
  }
};
</script>

<style scoped>
.modal-product {
  overflow: visible;
}
</style>
