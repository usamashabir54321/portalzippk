<template>
	<div id="main">
		<div class="row">
				<!-- MY PAGE TITLE -->
			<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image" style="background-image: url(admin/images/gallery/breadcrumb-bg.jpg);">
				<div class="container">
					<div class="row">
						<div class="col s12 m6 l6">
							<h5 class="breadcrumbs-title mt-0 mb-0"><span>My All Animations ({{ allItems.length }})</span></h5>
						</div>
						<div class="col s12 m6 l6">
							<button @click="setOrder" class="btn waves-effect waves-light cyan right"><b>Set Order</b></button>
						</div>
					</div>
				</div>
			</div>
				<!-- PAGE BODY -->
			<div class="col s12">
				<div class="container">
					<div class="card">
						<div class="card-content">
							<div class="row">
								<div class="col s12">

									<table class="bordered">
										<tbody>
											<tr v-for="(obj , index) in allItems" :key="index">
												<td>{{ obj.card_num }}</td>
												<td class="pstr_img_td"><img :src="`${$axios.defaults.baseURL}${obj.postr_img}`"></td>
												<td>{{ obj.title }}</td>
												<td>{{ obj.sku_code }}</td>
												<td>
													<a :href="obj.drive_url" target="_blank" class="mr-4">Go Drive</a>
													<a :href="obj.sku_url" target="_blank">Go youtube Video</a>
												</td>
												<td>
													<nuxt-link :to="`/product/${obj.id}`" class="btn-floating waves-effect waves-light gradient-45deg-purple-deep-orange gradient-shadow"><i class="material-icons">edit</i></nuxt-link>&nbsp;
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
  				allItems: [],
  			}
  		},
  		mounted () {
  			this.getData();
  		},
  		methods: {
  			getData () {
  				this.$axios.get('/api/prtalOnlyGet/allAnime').then(res => {
  					this.allItems = res.data;
  				});
  			},
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
  						this.$axios.delete('/api/products/'+id).then(res => {
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
  			setOrder () {
  				this.$axios.get('/api/prtalOnlyGet/setAnimes');
  				this.sweatAlert('success','Please wait for 10sec min for arranging orders of all items well.');
  				setTimeout(() => {this.getData();this.sweatAlert('success','All items are now well settled');},10000);
  			},
  		},
	}
</script>