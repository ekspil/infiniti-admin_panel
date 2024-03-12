<template>
  <form
    class="card auth-card modal modal-product-description style"
    id="modal-product-description"
    @submit.prevent="save()"
  >
    <div class="card-content style">
      <span class="card-title">Товар</span>
      <span
        ><img
          class=""
          v-if="product.img"
          :src="
            product.img
              ? 'https://api.rb24.ru/api/v1/files/download/1/' + product.img
              : '/burger.png'
          "
          height="50px"
          width="50px"
        /> </span
      ><br />
      <table>
        <tr>
          <td colspan="2">
            <div class="input-field">
              <input
                id="pname"
                type="text"
                v-model.trim="product.name"
                disabled
              />
              <label for="pname">Наименование</label>
              <small v-if="false" class="helper-text invalid"
                >Должно быть заполнено</small
              >
            </div>
          </td>
        </tr>

        <tr>
          <td  colspan="2">
            <div class="input-field">
              <select ref="selectset" multiple v-model="product.helpers">
                <option value="" disabled
                  >Выберете группы подсказок</option
                >
                <option
                  v-for="item of helpers"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.name }}</option
                >
              </select>
              <label>Набор подсказок</label>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="input-field">
              <input id="prot" type="number" step="0.1" v-model="product.des_p" />
              <label for="prot">Белки</label>
              <small v-if="false" class="helper-text invalid">Белки</small>
            </div>
          </td>
          <td>
            <div class="input-field">
              <input id="lip" type="number" step="0.1" v-model="product.des_l" />
              <label for="lip">Жиры</label>
              <small v-if="false" class="helper-text invalid">Жиры</small>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="input-field">
              <input id="carb" type="number" step="0.1" v-model="product.des_c" />
              <label for="carb">Углеводы</label>
              <small v-if="false" class="helper-text invalid">Углеводы</small>
            </div>
          </td>
          <td>
            <div class="input-field">
              <input id="cal" type="number" step="0.1" v-model="product.des_k" />
              <label for="cal">Каллории</label>
              <small v-if="false" class="helper-text invalid">Каллории</small>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="input-field">
              <input id="desc" type="text" v-model.trim="product.description" />
              <label for="desc">Описание</label>
              <small v-if="false" class="helper-text invalid">Описание</small>
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
import axios from "axios";
export default {
  name: "ModalPD",
  props: ["items", "product", "groups", "mods", "kiosks", "helpers"],
  data: () => ({
    modal: {},
    select: null,
    select2: null,
    select3: null,
    select4: null,
    select5: null
  }),
  methods: {
    async handleFileUpload(fileName) {
      this.file = this.$refs[fileName].files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      try {
        await axios.post(
          `https://api.rb24.ru/api/v1/files/upload/1/${this.file.name}`,
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
      this.$emit("close_description");
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
    this.select5 = window.M.FormSelect.init(this.$refs.heddencheck);
    window.M.updateTextFields();
  }
};
</script>

<style scoped>
.modal-product-description {
  overflow: visible;
}
.style {
  width: 800px;
}
td {
  padding-bottom: 0;
  padding-top: 0;
  width: 350px;
}
.input-field {
  margin-bottom: 0 !important;
}
</style>
