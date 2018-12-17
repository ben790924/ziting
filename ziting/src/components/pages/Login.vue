
<template>
<div>

    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-26">
						Welcome
					</span>
					<span class="login100-form-title p-b-48">
						<i class="zmdi zmdi-font"></i>
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
						<input class="input100" type="text" name="email" v-model="user.username" placeholder="輸入EMAIL">

					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye" @click="showPassword"></i>
						</span>
						<input class="input100" type="password" name="pass" v-model="user.password" id="myInput" placeholder="輸入密碼">

					</div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" @click.prevent="login">
								Login
							</button>
						</div>
					</div>

					<div class="text-center p-t-115">
						<span class="txt1">
							Don’t have an account?
						</span>

						<a class="txt2" href="#">
							Sign Up
						</a>
					</div>
				</form>
			</div>
		</div>
    <div id="dropDownSelect1"></div>
	</div>

</div>



</template>
	<script src=""></script>
<!--===============================================================================================-->
	<script src="@/assets/Login_v2/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="@/assets/Login_v2/vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="@/assets/Login_v2/vendor/bootstrap/js/popper.js"></script>
	<script src="@/assets/Login_v2/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="@/assets/Login_v2/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="@/assets/Login_v2/vendor/daterangepicker/moment.min.js"></script>
	<script src="@/assets/Login_v2/vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="@/assets/Login_v2/vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="@/assets/Login_v2/js/main.js"></script>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'UA-23581568-13');
	</script>

<script>
export default {
	name: 'Login',
	data () {
		return {
			user:{
				'username':'',
				'password':''
			}
		}
	},
	methods:{
		login(){
			let vm = this
			let url = `${process.env.APIPATH}/admin/signin`
			this.axios.post(url,vm.user).then((res)=>{
				if(res.data.success){
					vm.$router.push('/')
				}else{
					vm.$router.push('/Login')
				}
			})
		},
		showPassword(){

				var x = document.getElementById("myInput");
				if (x.type === "password") {
					x.type = "text";
				} else {
					x.type = "password";
				}

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import '../../assets/Login_v2/images/icons/favicon.ico';
@import '../../assets/Login_v2/vendor/bootstrap/css/bootstrap-grid.min.css';
@import '../../assets/Login_v2/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
@import '../../assets/Login_v2/fonts/iconic/css/material-design-iconic-font.min.css';
@import '../../assets/Login_v2/vendor/animate/animate.css';
@import '../../assets/Login_v2/vendor/css-hamburgers/hamburgers.min.css';
@import '../../assets/Login_v2/vendor/animsition/css/animsition.min.css';
@import '../../assets/Login_v2/vendor/select2/select2.min.css';
@import '../../assets/Login_v2/vendor/daterangepicker/daterangepicker.css';
@import '../../assets/Login_v2/css/util.css';
@import '../../assets/Login_v2/css/main.css';
</style>
