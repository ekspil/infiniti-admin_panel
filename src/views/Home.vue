<template>
  <div>
    <div class="page-title">
      <h3>Смена</h3>
      <ModalSmena @close="refresh()" :smena="smena" v-if="isOpen"/>
      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
<!--      <div class="col s12 m6 l4">-->
<!--        <div class="card light-blue bill-card">-->
<!--          <div class="card-content white-text">-->
<!--            <span class="card-title">План по ТО</span>-->

<!--            <p class="currency-line">-->
<!--              <span>{{smena.plan}}</span>-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <div class="col s12 m6 l12" v-if="kiosks">
        <div class="card orange darken-3 ">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Текущие показатели</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Киоск</th>
                  <th>Чеков</th>
                  <th>Товарооборот</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="kiosk of kiosks" :key="kiosk.id">
                  <td>{{ kiosk.name }}</td>
                  <td> {{ kiosk.billCount }} чеков</td>
                  <td> {{ kiosk.billSum }} руб</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed-action-btn">
      <button class="btn-floating btn-large blue" @click="openModal()">
        <i class="large material-icons">add</i>
      </button>
    </div>
  </div>
</template>

<script>
import ModalSmena from "@/components/ModalSmena";
export default {
  components: {
    ModalSmena
  },
  name: "Home",
  data: ()=>({
    isOpen: false,
    smena: {
      plan: null,
      pin: "1234321"
    },
    kiosks: null,
    modalSmena: null,
  }),
  async mounted() {
    const smena = await this.$store.dispatch("getLastSmena" );
    const kiosks = await this.$store.dispatch("getAllKiosks", {report: true} );
    if (smena){
      this.smena = smena
    }
    if (kiosks){
      this.kiosks = kiosks
    }
  },
  methods: {
    async refresh() {
      this.modalSmena.close();
      this.smena = await this.$store.dispatch("getLastSmena", {});
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
      this.modalSmena = window.M.Modal.init(
              document.querySelector(".modal-smena"),
              {}
      );

      this.modalSmena.open();
      this.modalSmena.options.onCloseEnd = () => {
        this.isOpen = false;
      };

    }
  }
};
</script>

<style scoped></style>
