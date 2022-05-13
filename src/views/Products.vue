<template>
  <div>
    <div>
      <table>
        <tbody>
          <tr class="page-title">
            <td><h3>Продукты</h3></td>
            <td>
              <div>
                <label>
                  <input type="checkbox" v-model="archive" />
                  <span>Показывать архивные записи</span>
                </label>
              </div>
            </td><td>
            <div class="input-field">
              <select ref="selectgroup" v-model="selectedGroup">
                <option :value="null" key="nulnul" selected>Все</option>
                <option
                    v-for="item of groups"
                    :key="item.id"
                    :value="item.id"
                >{{ item.name }}</option
                >
              </select>
            </div>
            </td>
            <td>
              <div class="input-field" v-if="false">
                <select ref="selectkiosk" v-model="selectedKiosk">
                  <option value="ALL" selected>Все</option>
                  <option :value="null" selected>Без киоска</option>
                  <option
                    v-for="item of kiosks"
                    :key="item.id"
                    :value="item.name"
                    >{{ item.name }}</option
                  >
                </select>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div></div>

    <ModalProduct
      v-if="items && groups && products && mods && isOpen"
      @close="refresh()"
      :items="items"
      :groups="groups"
      :product="product"
      :mods="mods"
      :kiosks="kiosks"
    />

    <section v-if="products && groups">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Наименование</th>
            <th>Цена</th>
            <th>Общий код</th>
            <th>Купон</th>
            <th>Станция</th>
            <th>Группа</th>
            <th>Открыть</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item of filtredProducts"
            :key="item.id"
            :class="{ transperent: item.archive }"
          >
            <td>{{ item.id }}</td>
            <td>
              <img
                class=""
                v-if="item.img"
                :src="
                  item.img
                    ? 'https://api.rb24.ru/api/v1/files/download/1/' + item.img
                    : '/burger.png'
                "
                height="30px"
                width="30px"
              />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.coupon }}</td>
            <td>
              <span class="white-text badge red">{{ item.station }}</span>
            </td>

            <td>{{ groupName(item.group_id) }}</td>
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
import ModalProduct from "@/components/ModalProduct";
export default {
  name: "Products",
  components: {
    ModalProduct
  },
  data: () => ({
    selectedGroup: null,
    kiosks: null,
    selectedKiosk: "ALL",
    products: null,
    modalProduct: null,
    isOpen: false,
    items: null,
    groups: null,
    mods: null,
    archive: false,
    product: {
      id: null,
      name: null,
      items: [],
      station: 1,
      code: null,
      kiosk: "ALL",
      price: null,
      mods: [],
      archive: null,
      img: null,
      coupon: null,
      couponPrice: 9999,
      hidden: false,
      priority: 0
    }
  }),
  watch: {
    async archive(nValue) {
      this.products = await this.$store.dispatch("getAllProducts", {
        archive: nValue
      });
    }
  },
  computed: {
    filtredProducts() {
      if (!this.products) return null;
      if (this.selectedKiosk === "ALL" && this.selectedGroup === null) return this.products
      let p = this.products
      if(this.selectedKiosk !== "ALL"){
        p = this.products.filter(
            product => product.kiosk === this.selectedKiosk
        );
      }
      if(this.selectedGroup !== null){
        p = this.products.filter(
            product => product.group_id === this.selectedGroup
        );
      }
      return p

    }
  },
  methods: {
    groupName(id) {
      const gr = this.groups.find(it => it.id === id);
      if (!gr) return "";
      return gr.name;
    },
    async del(item) {
      item.action = "DELETE";
      const ok = await this.$store.dispatch("saveProduct", item);
      if (ok) {
        this.products = await this.$store.dispatch("getAllProducts", {});
        return;
      }
      return ok;
    },
    async openModal(p) {
      if (!p) {
        this.product = {
          id: null,
          name: null,
          items: [],
          station: 1,
          code: null,
          kiosk: "ALL",
          price: null,
          archive: null,
          mods: [],
          img: null,
          coupon: null,
          couponPrice: 9999,
          hidden: false,
          priority: 0
        };
      } else {
        this.product = JSON.parse(JSON.stringify(p));
      }
      this.isOpen = true;
      await this.$forceUpdate();
      this.modalProduct = window.M.Modal.init(
        document.querySelector(".modal-product"),
        {}
      );
      this.modalProduct.open();
      this.modalProduct.options.onCloseEnd = () => {
        this.isOpen = false;
      };
    },
    async refresh() {
      this.modalProduct.close();
      this.isOpen = false;
      this.products = await this.$store.dispatch("getAllProducts", {});
    }
  },
  async beforeMount() {
    this.items = await this.$store.dispatch("getAllItems", {});
  },
  async mounted() {
    this.products = await this.$store.dispatch("getAllProducts", {
      archive: this.archive
    });
    this.kiosks = await this.$store.dispatch("getAllKiosks", {});
    this.groups = await this.$store.dispatch("getAllGroups", {});
    this.mods = await this.$store.dispatch("getAllMods", {});
    this.select3 = window.M.FormSelect.init(this.$refs.selectkiosk);
    this.select4 = window.M.FormSelect.init(this.$refs.selectgroup);
    window.M.updateTextFields();
  }
};
</script>
<style>
.transperent {
  opacity: 40%;
}
</style>

<style scoped></style>
