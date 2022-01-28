<template>
  <div id="index_pg">
    <Nuxt/>
  </div>
</template>

<script>
  export default {
    beforeCreate () {
      if (this.$cookies.get('admin_token')) {
        this.$router.push({name : 'dashboard'});
      }
    },
  }
</script>

<style>
  .nuxt-progress {
    background-color : #20bf55 !important;
    background-image : linear-gradient(315deg, #20bf55 0%, #01baef 74%) !important;
    height: 1px;
  }
</style>