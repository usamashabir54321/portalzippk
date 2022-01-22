export default {

	methods: {
		swalfire (icon,msg) {
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
		createCaptcha () {
			document.getElementById('captcha_prnt').innerHTML = "";
			var charsArray =
			"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
			var lengthOtp = 5;
			var captcha = [];
			for (var i = 0; i < lengthOtp; i++) {
				var index = Math.floor(Math.random() * charsArray.length + 1);
				if (captcha.indexOf(charsArray[index]) == -1)
					captcha.push(charsArray[index]);
				else i--;
			}
			var canv = document.createElement("canvas");
			canv.id = "captcha_canvas";
			canv.width = 120;
			canv.height = 40;
			var ctx = canv.getContext("2d");
			ctx.font = "30px Georgia";
			ctx.strokeText(captcha.join(""), 0, 30);
			this.captchaCode = captcha.join("");
			document.getElementById("captcha_prnt").appendChild(canv);
		},
		validateEmailCode (email) {
			var re = /\S+@\S+\.\S+/;
			return re.test(email);
		},
	},
	
}
