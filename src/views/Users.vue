<template>
  <div>
    <div class="page-title">
      <h3>Пользователи</h3>
    </div>


    <ModalUsers @close="refresh()" :user="user" :kiosks="kiosks" v-if="isOpen && kiosks"/>

    <section v-if="users && kiosks">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Логин</th>
            <th>Роль</th>
            <th>Редактировать</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="us of users" :key="us.id">
            <td>{{ us.id }}</td>
            <td>{{ us.name }}</td>
            <td>{{ us.login }}</td>
            <td>
              <span
                class="white-text badge"
                :class="{
                  red: us.role === 'ADMIN',
                  green: us.role === 'USER'
                }"
                >{{ us.role }}</span
              >
            </td>
            <td>
              <button class="btn-small btn" @click="openModal(us)">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>

            <td>
              <button class="btn-small btn" @click="del(us)">
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
import ModalUsers from "@/components/ModalUser";
export default {
  name: "Users",
  components: {
    ModalUsers
  },
  data: () => ({
    isOpen: false,
    modalUser: null,
    users: null,
    kiosks: null,
    user: {
      id: null,
      name: null,
      login: null,
      password: null,
      role: null
    }
  }),
  methods: {
    async del(item) {
      item.action = "DELETE"
      const ok = await this.$store.dispatch("saveUser", item);
      if (ok) {
        this.users = await this.$store.dispatch("getAllUsers", {});
        return;
      }
      return ok;
    },
    async openModal(i) {
      if (!i) {
        this.user = {
          id: null,
          name: null,
          login: null,
          password: null,
          role: null
        };
      } else {
        this.user = i;
      }
      this.isOpen = true;

      await this.$forceUpdate();
      this.modalUser = window.M.Modal.init(
        document.querySelector(".modal-user"),
        {}
      );

      this.modalUser.open();
      this.modalUser.options.onCloseEnd = () => {
        this.isOpen = false;
      };

    },
    async refresh() {
      this.modalUser.close();
      this.users = await this.$store.dispatch("getAllUsers", {});
    }
  },
  async mounted() {
    this.users = await this.$store.dispatch("getAllUsers", {});
    this.kiosks = await this.$store.dispatch("getAllKiosks", {});
    window.M.updateTextFields();
  }
};
</script>

<style scoped></style>
