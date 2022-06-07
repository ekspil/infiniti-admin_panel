<template>
  <div>
    <div class="page-title">
      <h3>Киоски</h3>
    </div>

    <modalKiosks
      @close="refresh()"
      :kiosk="kiosk"
      :products="products"
      v-if="isOpen"
    />

    <section v-if="kiosks && products">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Логин</th>
            <th>Описание</th>
            <th>Бл</th>
            <th>Пер</th>
            <th>L-O</th>
            <th>Z</th>
            <th>Del</th>
            <th>Edit</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="us of kiosks" :key="us.id">
            <td>{{ us.id }}</td>
            <td>{{ us.name }}</td>
            <td>{{ us.uid }}</td>
            <td>
              <button
                class="btn-small btn"
                :class="{ red: us.lock }"
                @click="lock(us)"
              >
                <i class="material-icons">lock</i>
              </button>
            </td>
            <td>
              <button class="btn-small btn" @click="command(us, 'reload')">
                <i class="material-icons">autorenew</i>
              </button>
            </td>
            <td>
              <button class="btn-small btn" @click="command(us, 'logout')">
                <i class="material-icons">logout</i>
              </button>
            </td>
            <td>
              <button class="btn-small btn" @click="command(us, 'settlement')">
                <i class="material-icons">request_quote</i>
              </button>
            </td>
            <td>
              <button class="btn-small btn" @click="command(us, 'delete_bill')">
                <i class="material-icons">close</i>
              </button>
            </td>
            <td>
              <button class="btn-small btn" @click="openModal(us)">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>

            <td>
              <button
                class="btn-small btn"
                @dblclick="del(us)"
                :disabled="$store.state.auth.user.role !== 'ADMIN'"
              >
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
import modalKiosks from "@/components/ModalKiosks";
export default {
  name: "Kiosks",
  components: {
    modalKiosks
  },
  data: () => ({
    isOpen: false,
    modalKiosk: null,
    kiosks: null,
    products: null,
    kiosk: {
      id: null,
      name: null,
      uid: null,
      key: null,
      gate: null,
      stops: [],
      kiosks: [],
      vip: false
    }
  }),
  methods: {
    async del(item) {
      item.action = "DELETE";
      const ok = await this.$store.dispatch("saveKiosk", item);
      if (ok) {
        this.kiosks = await this.$store.dispatch("getAllKiosks", {});
        return;
      }
      return ok;
    },
    async lock(item) {
      if (item.lock === null) item.lock = false;
      item.lock = !item.lock;
      const ok = await this.$store.dispatch("saveKiosk", item);
      if (ok) {
        this.kiosks = await this.$store.dispatch("getAllKiosks", {});
        return;
      }
      return ok;
    },
    async command(item, command) {
      const ok = await this.$store.dispatch("commandKiosk", { item, command });
      if (ok) {
        this.kiosks = await this.$store.dispatch("getAllKiosks", {});
        return;
      }
      return ok;
    },
    async openModal(i) {
      if (!i) {
        this.kiosk = {
          id: null,
          name: null,
          uid: null,
          gate: null,
          stops: [],
          kiosks: [],
          vip: false
        };
      } else {
        this.kiosk = i;
      }
      this.isOpen = true;

      await this.$forceUpdate();
      this.modalKiosk = window.M.Modal.init(
        document.querySelector(".modal-kiosk"),
        {}
      );

      this.modalKiosk.open();
      this.modalKiosk.options.onCloseEnd = () => {
        this.isOpen = false;
      };
    },
    async refresh() {
      this.modalKiosk.close();
      this.kiosks = await this.$store.dispatch("getAllKiosks", {});
    }
  },
  async mounted() {
    this.kiosks = await this.$store.dispatch("getAllKiosks", {});
    this.products = await this.$store.dispatch("getAllProducts", {
      archive: false
    });
    window.M.updateTextFields();
  }
};
</script>

<style scoped></style>
