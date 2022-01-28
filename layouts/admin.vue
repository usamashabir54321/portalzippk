<template>
  <div>
    <div v-show="!showAdmin" class="loading"><span></span></div>
    <div v-show="showAdmin">
      <div class="vertical-layout page-header-light vertical-menu-collapsible vertical-dark-menu preload-transitions 2-columns" data-open="click" data-menu="vertical-dark-menu" data-col="2-columns">
        <admin-header :cutomizer="stateCustomzr" @closeCustomizr="stateCustomzr = false"/>
        <Nuxt />
        <a @click.prevent="stateCustomzr = true" class="btn btn-customizer pink accent-2 white-text theme-cutomizer-trigger"><i class="material-icons">settings</i></a>
      </div>
    </div>
    <script src="/webAssets/js/jquery.js"></script>
    <script src="/admin/js/vendors.min.js"></script>
    <script src="/admin/js/plugins.min.js"></script>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showAdmin: false,
        stateCustomzr: false,
      }
    },
    beforeCreate () {
      if (!this.$cookies.get('admin_token')) {
        this.$router.push({name : 'index'});
      } else {
        this.$axios.setHeader('Authorization', 'Bearer '+this.$cookies.get('admin_token'));
      }
    },
    created () {
      setTimeout(() => {this.showAdmin = true;},1000);
    },
    head() {
      return {
        title: 'PORTAL ZIP PK',
        link: [
          { rel: 'stylesheet' , href: '/admin/css/themes/vertical-dark-menu-template/materialize.min.css' },
          { rel: 'stylesheet' , href: '/admin/css/themes/vertical-dark-menu-template/style.min.css' },
          { rel: 'stylesheet' , href: '/admin/css/pages/dashboard-modern.css' },
          { rel: 'stylesheet' , href: '/admin/css/custom/custom.css' },
          { rel: 'stylesheet' , href: '/admin/css/animate.css' },
          { rel: 'stylesheet' , href: '/admin/css/jquery.dataTables.min.css' },
          { rel: 'stylesheet' , href: '/admin/css/icon.css?family=Material+Icons' },
        ],
        script: [
          { src: '/admin/js/dataTables.js' , defer: 'defer' },
        ],
      }
    },
  }
</script>

<style>
  .loading {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
  }
  @keyframes circle-loading {to {transform: rotateZ(360deg);}}
  .loading span {
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #fff;
    animation: circle-loading 1200ms ease infinite;
  }
  .dataTables_wrapper {padding: 20px !important;}
  .dataTables_wrapper .dataTables_length {width: 10% !important;;}
  .dataTables_wrapper .dataTables_length select {width: 40% !important;;height: 32px !important;;}
  .dataTables_wrapper .dataTables_filter {width: 20% !important;;}
  .dataTables_wrapper .dataTables_filter input {
    width: 70% !important;;
    height: 20px !important;;
    padding-left: 13px !important;;
    margin-left: 14px !important;;
  }
  .sidenav li:hover {background-color: rgb(237 237 237)!important;}
  td {text-align: center;}td.pstr_img_td {width: 120px;}.div_img {text-align: center;}.div_img img {max-width: 120px;}
  .card-content table.bordered tr td.pstr_img_td {padding: 0px !important;}td.pstr_img_td img {width: 100%;vertical-align: middle;height: 120px;}
  span.remover {position: absolute;background-color: black;border-radius: 50%;font-size: 12px;padding: 3px;margin-left: 12px;}
</style>