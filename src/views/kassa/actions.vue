<template>
  <div class="height100">
    <div class="row " v-if="!action">
      <div class="col s12">
        <div class="card-panel hoverable  grey lighten-1 white-text ">
          {{ number }}
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('1')"
        >
          1
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('2')"
        >
          2
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('3')"
        >
          3
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('4')"
        >
          4
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('5')"
        >
          5
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('6')"
        >
          6
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('7')"
        >
          7
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('8')"
        >
          8
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('9')"
        >
          9
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="find()"
        >
          Find
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('0')"
        >
          0
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="bksp()"
        >
          Bksp
        </div>
      </div>

      <div class="col s4 margin-top">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="plus"
        >
          +
        </div>
      </div>
      <div class="col s4 margin-top">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="minus"
        >
          -
        </div>
      </div>
      <div class="col s4 margin-top">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="del()"
        >
          Del
        </div>
      </div>
    </div>

    <div class="row " v-if="action === 'PAY_CALCULATE'">
      <div class="col s12">
        <div class="card-panel hoverable  grey lighten-1 white-text ">
          {{ number }}
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('1')"
        >
          1
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('2')"
        >
          2
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('3')"
        >
          3
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('4')"
        >
          4
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('5')"
        >
          5
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('6')"
        >
          6
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('7')"
        >
          7
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('8')"
        >
          8
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('9')"
        >
          9
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="calculate()"
          style="padding-left: 8px"
        >
          Внести
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('0')"
        >
          0
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="bksp()"
        >
          Bksp
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="action = 'PAY_TYPE'"
        >
          Назад
        </div>
      </div>
    </div>

    <div class="row " v-if="action === 'RETURN_START'">
      <div class="col s12">
        <div class="card-panel hoverable  grey lighten-1 white-text ">
          {{ number }}
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('1')"
        >
          1
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('2')"
        >
          2
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('3')"
        >
          3
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('4')"
        >
          4
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('5')"
        >
          5
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('6')"
        >
          6
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('7')"
        >
          7
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('8')"
        >
          8
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('9')"
        >
          9
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="find('PAYED')"
          style="padding-left: 8px"
        >
          Найти
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('0')"
        >
          0
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="bksp()"
        >
          Bksp
        </div>
      </div>
    </div>

    <div
      class="row "
      v-if="action === 'RETURN_START' || action === 'RETURN_WAIT'"
    >
      <div class="col s6">
        <div
          v-if="corner === 'KASSA' || allowPay"
          class="card-panel hoverable green darken-2"
          @click="returnChekPayment"
        >
          <div v-if="action === 'RETURN_START'">
            Аннулировать
          </div>
          <div v-if="action === 'RETURN_WAIT'">
            <Waiter></Waiter>
          </div>
        </div>
      </div>
      <div class="col s6">
        <div
          class="card-panel hoverable orange darken-2"
          @click="clearAction()"
        >
          Вернуться
        </div>
      </div>
    </div>

    <div v-if="cashBack" class="text-size-large">
      Сдача: {{ cashBack }} руб.
    </div>

    <div class="row " v-if="!action">
      <div class="col s6">
        <div
          v-if="corner !== 'KASSA' && !allowPay"
          class="card-panel hoverable green darken-2"
          @click="save()"
        >
          <div v-if="!actionKassa">
            Сохранить
          </div>
          <div v-if="actionKassa === 'WAIT'">
            <Waiter></Waiter>
          </div>
        </div>
        <div
          v-if="corner === 'KASSA' || allowPay"
          class="card-panel hoverable green darken-2"
          @click="pay()"
        >
          Оплатить
        </div>
      </div>
      <div class="col s6">
        <div class="card-panel hoverable orange darken-2" @click="clear()">
          Очистить
        </div>
      </div>
    </div>

    <div class="row " v-if="action === 'PAY_START'">
      <div class="col s6">
        <div class="card-panel hoverable grey darken-2" @click="setType('IN')">
          В зале
        </div>
      </div>
      <div class="col s6">
        <div class="card-panel hoverable grey darken-1" @click="setType('OUT')">
          На вынос
        </div>
      </div>
    </div>

    <div class="row " v-if="action === 'PAY_TYPE'">
      <div class="col s6">
        <div
          class="card-panel hoverable grey darken-2"
          @click="setPayType('CASH')"
        >
          Наличные
        </div>
      </div>
      <div class="col s6">
        <div
          class="card-panel hoverable grey darken-1"
          @click="setPayType('CASHLESS')"
        >
          Безнал
        </div>
      </div>
    </div>

    <div class="row " v-if="action === 'FISCAL_MENU'">
      <div class="col s6">
        <div class="card-panel hoverable grey darken-2" @click="xReport()">
          X-отчет
        </div>
      </div>
      <div class="col s6">
        <div class="card-panel hoverable grey darken-1" @click="zReport()">
          Закрытие смены
        </div>
      </div>
      <div class="col s6">
        <div
          v-if="true"
          class="card-panel hoverable grey darken-1"
          @click="returnCheck()"
        >
          Аннулирование
        </div>
      </div>
      <div class="col s6">
        <div class="card-panel hoverable grey darken-2" @click="action = ''">
          Вернуться
        </div>
      </div>
    </div>

    <div class="row ">
      <div class="col s12" v-if="action === ''">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="newOrder()"
        >
          Новый заказ
        </div>
      </div>
    </div>

    <div v-if="action === 'WAIT'" class="cssload-thecube">
      <div class="cssload-cube cssload-c1"></div>
      <div class="cssload-cube cssload-c2"></div>
      <div class="cssload-cube cssload-c4"></div>
      <div class="cssload-cube cssload-c3"></div>
    </div>

    <div class="row " v-if="((corner === 'KASSA' || allowPay) && cashBack !== null) || action === 'END'">
      <div
        class="col s12"

      >
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="clearAction()"
        >
          Завершить
        </div>
      </div>
    </div>
    <div v-if="(corner === 'KASSA' || allowPay) && action === ''" class="right-align">
      <i
        class="material-icons white-text " style=" height: 31px"
        @click="action = 'FISCAL_MENU'">print</i>
    </div>
  </div>
</template>

<script>
import Waiter from "@/views/kassa/waiter";
export default {
  name: "actions",
  components: {
    Waiter
  },
  props: ["corner", "bill", "actionKassa", "smena"],
  data: () => ({
    number: "",
    action: "",
    type: "IN",
    payType: "CASHLESS",
    cashBack: null,
    allowPay: false,
  }),
  computed: {
    sum() {
      return this.bill.items.reduce((acc, item) => {
        return (acc += item.count * item.price);
      }, 0);
    }
  },
  mounted() {
    if(this.$route.query.pay){
      this.allowPay = true
    }
  },
  methods: {
    async xReport() {
      await this.$store.dispatch("xReport", {
        printer: Number(this.$route.query.printer) || 0,
        kkmServer: this.$route.query.kkmServer
      });
    },
    async returnCheck() {
      this.action = "RETURN_START";
      this.$emit("setAction", "RETURN");
    },
    async returnChekPayment() {
      if (this.number !== this.smena.pin) {
        alert("Неверный пароль!");
        return;
      }
      this.action = "RETURN_WAIT";

      if (this.bill.payType === "CASHLESS") {
        const result = await this.$store.dispatch("returnChekPayment", {
          ...this.bill,
          kkmServer: this.$route.query.kkmServer
        });
        if (!result.result || (result.result.Error && !result.result.Error.includes("Index was out of range"))) {
          alert(
            "Произошла ошибка или произведена отмена операции на терминале"
          );
          this.action = "";
          return;
        }
      }


      await this.$store.dispatch("setCanceled", { ...this.bill });
      await this.printFiscal("CANCELED");

      this.$emit("setAction", "");
      this.action = "";
      this.clearAction()
    },
    async zReport() {
      await this.$store.dispatch("zReport", {
        printer: Number(this.$route.query.printer) || 0,
        kkmServer: this.$route.query.kkmServer
      });
    },
    async printFiscal(status) {
      const data = {
        ...this.bill,

        printer: Number(this.$route.query.printer) || 0,
        typeCheck: 0,
        isBarCode: false,
        kkmServer: this.$route.query.kkmServer
      };

      if (status === "CANCELED") {
        data.typeCheck = 1;
        data.status = "CANCELED";
      } else {
        data.payType = this.payType;
      }

      const result = await this.$store.dispatch("printFiscal", data);
      console.log(result);
    },
    async payTerminal() {
      const result = await this.$store.dispatch("payTerminal", {
        ...this.bill,
        payType: this.payType,
        printer: Number(this.$route.query.printer) || 0,
        typeCheck: 0,
        isBarCode: false,
        kkmServer: this.$route.query.kkmServer
      });
      console.log(result);
      return result;
    },
    clearAction() {
      this.action = "";
      this.type = "";
      this.number = "";
      this.payType = "";
      this.cashBack = null;
      this.clear(true);
      this.$emit("setAction", "");
    },
    async calculate() {
      if (Number(this.number) - Number(this.sum) < 0) {
        alert("Введена сумма меньше чем требуется для оплаты!");
        return;
      }

      this.cashBack = Number(this.number) - Number(this.sum);
      const body = {
        ...this.bill,
        notPrint: true
      };
      await this.$store.dispatch("updateOrderKassa", body);
      await this.$store.dispatch("setPayed", { ...this.bill });

      await this.printFiscal();
      this.action = "CASHDONE";
    },
    async setPayType(type) {
      this.payType = type;
      this.bill.payType = type;
      if (type === "CASH") {
        this.action = "PAY_CALCULATE";
        return;
      }
      this.action = "WAIT";
      const result = await this.payTerminal();
      if (result.result.Error && !result.result.Error.includes("Index was out of range")) {
        alert(
          "Произошла ошибка при оплате, либо оплата отменена пользователем!"
        );
        this.action = "";
        return;
      }
      const body = {
        ...this.bill,
        notPrint: true
      };
      await this.$store.dispatch("updateOrderKassa", body);
      await this.$store.dispatch("setPayed", {
        ...this.bill,
        type: this.type,
        RRNCode: result.result.RRNCode,
        AuthorizationCode: result.result.AuthorizationCode
      });

      await this.printFiscal();
      this.action = "END";
    },
    setType(type) {
      this.type = type;
      this.bill.type = type;
      this.action = "PAY_TYPE";
    },
    pay() {
      if (!this.bill.route) return;
      this.action = "PAY_START";
    },
    click(num) {
      this.number += num;
    },
    bksp() {
      this.number = this.number.slice(0, -1);
    },
    del() {
      this.$emit("deleteString");
    },
    minus() {
      this.$emit("minusString");
    },
    plus() {
      this.$emit("plusString");
    },
    clear(data) {
      this.number = "";
      this.$emit("clear", data);
    },
    save() {
      if (this.actionKassa === "WAIT") {
        console.log("click blocked");
        return;
      }
      if (!this.bill.route) {
        alert("Нечего сохранять!");
        return;
      }
      this.$emit("save", this.number);
    },
    find(status) {
      this.$emit("find", this.number, status);
      this.number = "";
    },
    newOrder() {
      this.$emit("newOrder");
    }
  }
};
</script>

<style scoped>
.text-size-large {
  font-size: large;
  font-weight: bold;
  margin-left: 2%;
}
.height100 {
  height: 100vh;
  background-color: #595b5d;
}
.card-panel {
  margin: 3px;
  border: 0;
  text-align: center;
}
.margin-top {
  margin-top: 30px;
}
.white-text {
  font-size: 30px;
  font-weight: bold;
  padding: 12px;
  height: 11vh;
}
.grey-text {
  font-size: 20px;
  font-weight: bold;
  padding: 19px;
}

.cssload-thecube {
  width: 73px;
  height: 73px;
  margin: 0 auto;
  margin-top: 49px;
  position: relative;
  transform: rotateZ(45deg);
  -o-transform: rotateZ(45deg);
  -ms-transform: rotateZ(45deg);
  -webkit-transform: rotateZ(45deg);
  -moz-transform: rotateZ(45deg);
}
.cssload-thecube .cssload-cube {
  position: relative;
  transform: rotateZ(45deg);
  -o-transform: rotateZ(45deg);
  -ms-transform: rotateZ(45deg);
  -webkit-transform: rotateZ(45deg);
  -moz-transform: rotateZ(45deg);
}
.cssload-thecube .cssload-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
}
.cssload-thecube .cssload-cube:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(43, 160, 199);
  animation: cssload-fold-thecube 2.76s infinite linear both;
  -o-animation: cssload-fold-thecube 2.76s infinite linear both;
  -ms-animation: cssload-fold-thecube 2.76s infinite linear both;
  -webkit-animation: cssload-fold-thecube 2.76s infinite linear both;
  -moz-animation: cssload-fold-thecube 2.76s infinite linear both;
  transform-origin: 100% 100%;
  -o-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  -webkit-transform-origin: 100% 100%;
  -moz-transform-origin: 100% 100%;
}
.cssload-thecube .cssload-c2 {
  transform: scale(1.1) rotateZ(90deg);
  -o-transform: scale(1.1) rotateZ(90deg);
  -ms-transform: scale(1.1) rotateZ(90deg);
  -webkit-transform: scale(1.1) rotateZ(90deg);
  -moz-transform: scale(1.1) rotateZ(90deg);
}
.cssload-thecube .cssload-c3 {
  transform: scale(1.1) rotateZ(180deg);
  -o-transform: scale(1.1) rotateZ(180deg);
  -ms-transform: scale(1.1) rotateZ(180deg);
  -webkit-transform: scale(1.1) rotateZ(180deg);
  -moz-transform: scale(1.1) rotateZ(180deg);
}
.cssload-thecube .cssload-c4 {
  transform: scale(1.1) rotateZ(270deg);
  -o-transform: scale(1.1) rotateZ(270deg);
  -ms-transform: scale(1.1) rotateZ(270deg);
  -webkit-transform: scale(1.1) rotateZ(270deg);
  -moz-transform: scale(1.1) rotateZ(270deg);
}
.cssload-thecube .cssload-c2:before {
  animation-delay: 0.35s;
  -o-animation-delay: 0.35s;
  -ms-animation-delay: 0.35s;
  -webkit-animation-delay: 0.35s;
  -moz-animation-delay: 0.35s;
}
.cssload-thecube .cssload-c3:before {
  animation-delay: 0.69s;
  -o-animation-delay: 0.69s;
  -ms-animation-delay: 0.69s;
  -webkit-animation-delay: 0.69s;
  -moz-animation-delay: 0.69s;
}
.cssload-thecube .cssload-c4:before {
  animation-delay: 1.04s;
  -o-animation-delay: 1.04s;
  -ms-animation-delay: 1.04s;
  -webkit-animation-delay: 1.04s;
  -moz-animation-delay: 1.04s;
}

@keyframes cssload-fold-thecube {
  0%,
  10% {
    transform: perspective(136px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    transform: perspective(136px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    transform: perspective(136px) rotateY(180deg);
    opacity: 0;
  }
}

@-o-keyframes cssload-fold-thecube {
  0%,
  10% {
    -o-transform: perspective(136px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -o-transform: perspective(136px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -o-transform: perspective(136px) rotateY(180deg);
    opacity: 0;
  }
}

@-ms-keyframes cssload-fold-thecube {
  0%,
  10% {
    -ms-transform: perspective(136px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -ms-transform: perspective(136px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -ms-transform: perspective(136px) rotateY(180deg);
    opacity: 0;
  }
}

@-webkit-keyframes cssload-fold-thecube {
  0%,
  10% {
    -webkit-transform: perspective(136px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(136px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(136px) rotateY(180deg);
    opacity: 0;
  }
}

@-moz-keyframes cssload-fold-thecube {
  0%,
  10% {
    -moz-transform: perspective(136px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -moz-transform: perspective(136px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -moz-transform: perspective(136px) rotateY(180deg);
    opacity: 0;
  }
}
</style>
