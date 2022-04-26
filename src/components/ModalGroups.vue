<template>
  <form
    class="card auth-card modal modal-groups"
    id="modal-groups"
    @submit.prevent="save()"
  >
    <div class="card-content">
      <span class="card-title">Группа</span>
      <span
        ><img
          class=""
          v-if="group.img"
          :src="
            group.img
              ? 'https://api.rb24.ru/api/v1/files/download/1/' + group.img
              : '/burger.png'
          "
          height="50px"
          width="50px"
        /> </span
      ><br />
      <div class="input-field">
        <input id="catname" type="text" v-model="group.name" />
        <label for="catname">Наименование</label>
        <small v-if="false" class="helper-text invalid">Наименование</small>
      </div>

      <div class="input-field">
        <input
          class=""
          type="file"
          id="fileImgGroup"
          ref="fileImgGroup"
          for="pname"
          v-on:change="handleFileUpload('fileImgGroup')"
        />
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
  name: "Modal",
  props: ["group"],
  data: () => ({
    modal: {},
    file: null
  }),
  async mounted() {
    window.M.updateTextFields();
  },
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
        this.group.img = `${this.file.name}`;
      } catch (e) {
        console.log(e);
        alert("Ошибка загрузки");
      }
    },
    close() {
      this.$emit("close");
    },
    async save() {
      const ok = await this.$store.dispatch("saveGroup", this.group);
      if (ok) {
        this.close();
        return;
      }
      return ok;
    }
  }
};
</script>

<style scoped></style>
