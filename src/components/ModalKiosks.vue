<template>
  <form
    class="card auth-card modal modal-kiosk style"
    id="modal-kiosk"
    @submit.prevent="save()"
  >
    <div class="card-content">
      <span class="card-title">Киоск</span>
      <br/>

     <br />
      <div class="input-field">
        <input
            class=""
            type="file"
            id="fileImg"
            ref="fileImg"
            v-on:change="handleFileUpload('fileImg')"
        />
      </div>
      <table>
        <tr>
          <td>
            <div id="kioskType333" class="input-field">
              <select ref="kioskType333" v-model="kiosk.type">
                <option :value="`LOCAL`" selected>Локальная ЭО</option>
                <option :value="`IIKO`">iiko cloud api</option>
              </select>
              <label for="kioskType333">Привязка к электронной очереди</label>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div id="kioskName" class="input-field">
              <input
                id="name"
                type="text"
                class="validate"
                v-model="kiosk.name"
                :disabled="$store.state.auth.user.role !== 'ADMIN'"
              />
              <label for="name">Имя</label>
              <small v-if="false" class="helper-text invalid">Name</small>
            </div>
          </td>
          <td>
            <div id="kioskName333" class="input-field">
              <select ref="kioskName333" v-model="kiosk.vip">
                <option :value="false" selected>НЕТ</option>
                <option :value="true">ДА</option>
              </select>
              <label for="name">VIP</label>
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
                :disabled="$store.state.auth.user.role !== 'ADMIN'"
              />
              <label for="uid">Пользовательское название</label>
              <small v-if="false" class="helper-text invalid">User id</small>
            </div>
          </td>
          <td>
            <div class="input-field">
              <input
                id="inn"
                type="text"
                class="validate"
                v-model="kiosk.atolInn"
                :disabled="$store.state.auth.user.role !== 'ADMIN'"
              />
              <label for="uid">ИНН для Атол</label>
              <small v-if="false" class="helper-text invalid">User id</small>
            </div>
          </td>
        </tr>

        <tr v-if="$store.state.auth.user.role === 'ADMIN'">
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
          <td>
            <div class="input-field">
              <input
                id="keyAtolU"
                type="text"
                class="validate"
                v-model="kiosk.atolLogin"
              />
              <label for="key">Atol Login</label>
            </div>
          </td>
        </tr>

        <tr v-if="$store.state.auth.user.role === 'ADMIN'">
          <td>
            <div class="input-field">
              <input
                id="keyAtolP"
                type="text"
                class="validate"
                v-model="kiosk.atolPassword"
              />
              <label for="key">Atol Password</label>
            </div>
          </td>
          <td>
            <div class="input-field">
              <input
                id="keyAtolG"
                type="text"
                class="validate"
                v-model="kiosk.atolGroup"
              />
              <label for="key">Atol Group</label>
            </div>
          </td>
        </tr>

        <tr v-if="$store.state.auth.user.role === 'ADMIN'">
          <td>
            <div class="input-field">
              <input
                id="iikoOrganizationId"
                type="text"
                class="validate"
                v-model="kiosk.iikoOrganizationId"
              />
              <label for="iikoOrganizationId">Iiko Organozation ID</label>
            </div>
          </td>
          <td>
            <div class="input-field">
              <input
                id="iikoTerminalGroupId"
                type="text"
                class="validate"
                v-model="kiosk.iikoTerminalGroupId"
              />
              <label for="iikoTerminalGroupId">Iiko Termonal Group ID</label>
            </div>
          </td>
        </tr>

        <tr>
          <td colspan="2">
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
import axios from "axios";

export default {
  name: "Modal",
  props: ["kiosk", "products"],
  data: () => ({
    modal: {},
    interval: null
  }),
  methods: {
    async handleFileUpload(fileName) {
      this.file = this.$refs[fileName].files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      try {
        await axios.post(
            `https://infiniti-kiosk-files-ekspil.amvera.io/api/v1/files/upload/1/kiosk-rb-bg-${this.kiosk.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                authorization: "Bearer " + "1111111111"
              }
            }
        );
        this[fileName] = `kiosk-rb-bg-${this.kiosk.id}`;
        this.kiosk.kioskImg = `kiosk-rb-bg-${this.kiosk.id}`;
      } catch (e) {
        console.log(e);
        alert("Ошибка загрузки");
      }
    },
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
    this.select2 = window.M.FormSelect.init(this.$refs.kioskName333);
    this.select2 = window.M.FormSelect.init(this.$refs.kioskType333);

    window.M.updateTextFields();
  }
};
</script>

<style scoped>
.style {
  width: 700px;
}
.modal-kiosk {
  overflow: visible;
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
