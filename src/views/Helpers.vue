<template>
  <div>
    <div class="page-title">
      <h3>Подсказки</h3>
    </div>

    <ModalHelper
      v-if="products && helpers && groups && isOpen"
      @close="refresh()"
      :products="products"
      :groups="groups"
      :helper="helper"
    />

    <section v-if="products && helpers">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
            <th>Приоритет</th>
            <th>Открыть</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item of helpers" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.priority }}</td>
            <td>
              <button class="btn-small btn" @click="openModal(item)">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>

            <td>
              <button class="btn-small btn" @click="del(item)">
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div class="fixed-action-btn">
      <button class="btn-floating btn-large blue" @click="openModal()">
        <i class="large material-icons">add</i>
      </button>
    </div>
  </div>
</template>

<script>
import ModalHelper from "@/components/ModalHelper";
export default {
  name: "Helpers",
  components: {
    ModalHelper
  },
  data: () => ({
    helpers: null,
    modalHelper: null,
    isOpen: false,
    products: null,
    groups: null,
    helper: {
      id: null,
      name: null,
      items: [],
      price: null
    }
  }),

  methods: {
    async del(item) {
      item.action = "DELETE";
      const ok = await this.$store.dispatch("saveHelper", item);
      if (ok) {
        this.helpers = await this.$store.dispatch("getAllHelpers", {});
        return;
      }
      return ok;
    },
    async openModal(p) {
      if (!p) {
        this.helper = {
          id: null,
          name: null,
          items: [],
          exclude: [],
          priority: null,
          price: null
        };
      } else {
        this.helper = JSON.parse(JSON.stringify(p));
      }
      this.isOpen = true;
      await this.$forceUpdate();
      this.modalHelper = window.M.Modal.init(
        document.querySelector(".modal-helper"),
        {}
      );
      this.modalHelper.open();
      this.modalHelper.options.onCloseEnd = () => {
        this.isOpen = false;
      };
    },
    async refresh() {
      this.modalHelper.close();
      this.isOpen = false;
      this.helpers = await this.$store.dispatch("getAllHelpers", {});
    }
  },
  async beforeMount() {
    this.products = await this.$store.dispatch("getAllProducts", {});
    this.groups = await this.$store.dispatch("getAllGroups", {});
  },
  async mounted() {
    this.helpers = await this.$store.dispatch("getAllHelpers", {});
  }
};
</script>

<style scoped></style>
