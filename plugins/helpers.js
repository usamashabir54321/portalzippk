import Vue from 'vue'
Vue.mixin({
    methods:{
        getScrptPdf (scrpt_id) {
            this.sweatAlert('success','Your PDF of script is building.');
            this.$axios.get('api/do_m_scrpt_code/gnrtePdf/'+scrpt_id).then(res => {
                window.open(this.$axios.defaults.baseURL+res.data, '_blank');
            });
        },
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