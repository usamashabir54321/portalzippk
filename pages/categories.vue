<template>
	<div id="main">
		<div class="row">

				<!-- MY PAGE TITLE -->
			<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image" style="background-image: url(admin/images/gallery/breadcrumb-bg.jpg);">
				<div class="container">
					<div class="row">
						<div class="col s12 m6 l6">
							<h5 class="breadcrumbs-title mt-0 mb-0"><span>Your Categories ({{ allCats.length }})</span></h5>
						</div>
					</div>
				</div>
			</div>
				<!-- ADDS CATEGORIES -->
			<div class="col s12">
				<div class="container">
					<div class="card">
						<div class="card-content">
							<h5 class="center-align">Add Category</h5>
							<div class="row">
								<div class="col s3 m3 l3"></div>
								<div class="col s6 m6 l6">
									<form class="row" @submit.prevent="addMyObj">
											<!-- CATEGORY TITLE -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="text" v-model="addObj.title" required>
												<label>Category Title</label>
											</div>
										</div>
											<!-- SUBMIT -->
										<div class="input-field col s12 center"><button class="btn waves-effect waves-light" type="submit" name="action">Submit <i class="material-icons right">send</i></button></div>
									</form>
								</div>
								<div class="col s3 m3 l3"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
				<!-- UPDATE CATEGORIES -->
			<div v-if="Object.keys(thisObj).length > 0" class="col s12">
				<div class="container">
					<div class="card">
						<div class="card-content">
							<h5 class="center-align">Update Category</h5>
							<div class="row">
								<div class="col s3 m3 l3"></div>
								<div class="col s6 m6 l6">
									<form class="row" @submit.prevent="updateMyObj">
											<!-- CATEGORY TITLE -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="text" v-model="thisObj.title" required>
												<label :class="thisObj.title ? 'active':''">Category Title</label>
											</div>
										</div>
											<!-- SUBMIT -->
										<div class="input-field col s12 center">
											<button @click.prevent="resetUpdate" class="red btn btn-reset mr-2"><i class="material-icons left">clear</i> Reset</button>
											<button class="btn waves-effect waves-light" type="submit" name="action">Update <i class="material-icons right">send</i></button>
										</div>
									</form>
								</div>
								<div class="col s3 m3 l3"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
				<!-- SHOWING ALL CATEGORIES -->
			<div class="col s12">
				<div class="container">
					<div class="card">
						<div class="card-content">
							<div class="row">
								<div class="col s12">
									<table class="bordered">
										<tbody>
											<tr v-for="(obj , index) in allCats" :key="index">
												<td>{{ index+1 }}</td>
												<td>{{ obj.title }}</td>
												<td>
													<a @click="updateThis(obj)" class="btn-floating waves-effect waves-light gradient-45deg-purple-deep-orange gradient-shadow"><i class="material-icons">edit</i></a>&nbsp;
													<a @click="deleteFunc(obj.id)" class="btn-floating waves-effect waves-light gradient-45deg-amber-amber gradient-shadow"><i class="material-icons">delete</i></a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
  		layout: 'admin',
  		data () {
  			return {
  				allCats: [],
  				addObj: {},
  				thisObj: {},
  			}
  		},
  		mounted () {
  			this.getData();
  		},
  		methods: {
  			getData () {
  				this.$axios.get('/api/categoires').then(res => {
  					this.allCats = res.data;
  				});
  			},
  			addMyObj () {
  				this.$axios.post('/api/categoires',this.addObj).then(res => {
  					this.sweatAlert('success','Form data is saved successfully');
  					this.addObj = {};
  					this.getData();
  					window.scrollTo(0,document.body.scrollHeight);
  				});
  			},
  			updateThis (obj) {
  				this.thisObj = obj;
  				window.scrollTo(0, 0);
  			},
  			updateMyObj () {
  				this.$axios.patch(`/api/categoires/${this.thisObj.id}`,this.thisObj).then(res => {
  					this.sweatAlert('success','Form data is saved successfully');
  					this.resetUpdate();
  				});
  			},
  			resetUpdate () {this.thisObj = {};this.getData();},
  			deleteFunc (id) {
  				const swalWithBootstrapButtons = this.$swal.mixin({
  					customClass: {
  						confirmButton: 'btn btn-large waves-effect waves-light gradient-45deg-green-teal gradient-shadow',
  						cancelButton: 'btn btn-large waves-effect waves-light gradient-45deg-purple-deep-orange gradient-shadow m_20'
  					},
  					buttonsStyling: false
  				})
  				swalWithBootstrapButtons.fire({
  					title: 'Are you sure?',
  					text: "You won't be able to revert this!",
  					icon: 'warning',
  					showCancelButton: true,
  					confirmButtonText: 'Yes, delete it!',
  					cancelButtonText: 'No, cancel!',
  					reverseButtons: true
  				}).then((result) => {
  					if (result.isConfirmed) {
  						/*DELETING BY AXIOS*/
  						this.$axios.delete('/api/categoires/'+id).then(res => {
  							this.getData();
  						});
  						swalWithBootstrapButtons.fire(
  							'Deleted!',
  							'Your file has been deleted.',
  							'success'
  						)
  					} else if (
  						result.dismiss === this.$swal.DismissReason.cancel
  						) {
  						swalWithBootstrapButtons.fire(
  							'Cancelled',
  							'Your imaginary file is safe :)',
  							'error'
  						)
  					}
  				})
  			},
  		},
	}
</script>

<style scoped>
	tr td:nth-child(2) {width: 60%;}
	.btn-floating {width: 35px;height: 35px;}
	.btn-floating i {font-size: 1.4rem;}
</style>