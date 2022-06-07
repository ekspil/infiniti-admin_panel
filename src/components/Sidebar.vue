<template>
  <ul class="sidenav app-sidenav" :class="{ open: navOpen }">
    <router-link
      v-for="link in computedLinks"
      tag="li"
      :key="link.url"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="/" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["navOpen"],
  data: () => ({
    links: [
      { title: "Смена", url: "/", exact: true },
      { title: "Киоски", url: "/kiosks" },
      //{ title: "Корнеры", url: "/corners" },
      { title: "Группы товаров", url: "/groups" },
      { title: "Товары", url: "/Products" },
      { title: "Модификаторы", url: "/Mods" },
      { title: "Подсказки", url: "/Helpers" },
      //{ title: "Заготовки", url: "/Items" },
      { title: "Пользователи", url: "/Users" },
      //{ title: "Рабочий стол", url: "/tabAdm" },
      //{ title: "Стол заготовок", url: "/tabAdmItems" },
      { title: "Экран гостя", url: "/admeo" }
    ]
  }),
  computed: {
    computedLinks(){
      if(this.$store.state.auth.user.role !== "ADMIN"){
        return [
          { title: "Смена", url: "/", exact: true },
          { title: "Киоски", url: "/kiosks" },
          { title: "Экран гостя", url: "/admeo" }
        ]
      }
      return this.links
    }
  }
};
</script>

<style scoped></style>
