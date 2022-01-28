import Vue from 'vue'
Vue.mixin({
    methods:{
        sweatAlert (icon,msg) {
            this.$swal({
                toast: true,
                icon: icon,
                title: msg,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            })
        },
    }
})