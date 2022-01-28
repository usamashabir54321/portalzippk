<template>
	<div id="main">
		<div class="row">
				<!-- MY PAGE TITLE -->
			<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image" style="background-image: url(/admin/images/gallery/breadcrumb-bg.jpg);">
				<div class="container">
					<div class="row">
						<div class="col s12 m6 l6">
							<h5 class="breadcrumbs-title mt-0 mb-0"><span>Update Your Products <small class="ml-2">Movies , Seasons , Animations</small></span></h5>
						</div>
					</div>
				</div>
			</div>
				<!-- PAGE BODY -->
			<div class="col s12">
				<div class="container">
					<div class="card mb-5">
						<div class="card-content">
							<div class="row">
								<div class="col s3 m3 l3"></div>
								<div class="col s6 m6 l6">
									<form class="row" @submit.prevent="updateMyObj">
											<!-- TITLE -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="text" v-model="updateObj.title" required>
												<label :class="updateObj.title ? 'active' : ''">Product Title</label>
											</div>
										</div>
											<!-- POSTER IMAGE -->
										<div class="col s12">
											<div class="input-field col s12">
												<small class="blue-text">Poster image dimensions should be 220 x 330 and size should be less than 80kb</small>
												<div class="file-field input-field">
													<div class="btn">
														<span>Poster Image</span>
														<input type="file" accept="image/*" ref="postr_img" @change="fileChngPostr('poster_img')">
													</div>
													<div class="file-path-wrapper">
														<input class="file-path validate valid" type="text">
													</div>
												</div>
											</div>
										</div>
										<div v-if="blobUrls.pstr_img_url" class="col s12 div_img"><img :src="blobUrls.pstr_img_url"></div>
										<div v-else class="col s12 div_img"><img :src="`${$axios.defaults.baseURL}${updateObj.postr_img}`"></div>
											<!-- BANNER IMAGE -->
										<div class="col s12">
											<div class="input-field col s12">
												<small class="blue-text">Banner image dimensions should be 1920 x 708 and size should be less than 300kb</small>
												<div class="file-field input-field">
													<div class="btn">
														<span>Banner Image</span>
														<input type="file" accept="image/*" ref="banner_img" @change="fileChngPostr('banner_img')">
													</div>
													<div class="file-path-wrapper">
														<input class="file-path validate valid" type="text">
													</div>
												</div>
											</div>
										</div>
										<div v-if="blobUrls.banner_img_url" class="col s12 div_img"><img :src="blobUrls.banner_img_url"></div>
										<div v-else class="col s12 div_img"><img :src="`${$axios.defaults.baseURL}${updateObj.banner_img}`"></div>
											<!-- PREVIEW VIDEO -->
										<div class="col s12">
											<div class="input-field col s12">
												<small class="blue-text">Preview video size should be less than 10mb</small>
												<div class="file-field input-field">
													<div class="btn">
														<span>Preview Video</span>
														<input type="file" accept="video/*" ref="preview_vid" @change="fileChngPostr('preview_vid')">
													</div>
													<div class="file-path-wrapper">
														<input class="file-path validate valid" type="text">
													</div>
												</div>
											</div>
										</div>
										<div class="col s12 div_img">
											<video v-if="blobUrls.preview_vid_url" width="320" height="240" controls>
												<source :src="blobUrls.preview_vid_url" type="video/mp4">
												<source :src="blobUrls.preview_vid_url" type="video/ogg">
												Your browser does not support the video tag.
											</video>
											<video v-if="!updateVid" width="320" height="240" controls>
												<source :src="`${$axios.defaults.baseURL}${updateObj.preview_vid}`" type="video/mp4">
												<source :src="`${$axios.defaults.baseURL}${updateObj.preview_vid}`" type="video/ogg">
												Your browser does not support the video tag.
											</video>
										</div>
											<!-- RATING -->
										<div class="col s12">
											<div class="input-field col s12">
												<select v-model="updateObj.rating" required>
													<option value="0">0</option>
													<option value="0.5">0.5</option>
													<option value="1">1</option>
													<option value="1.5">1.5</option>
													<option value="2">2</option>
													<option value="2.5">2.5</option>
													<option value="3">3</option>
													<option value="3.5">3.5</option>
													<option value="4">4</option>
													<option value="4.5">4.5</option>
													<option value="5">5</option>
												</select>
												<label :class="updateObj.rating ? 'active' : ''">Product Rating</label>
											</div>
										</div>
											<!-- TYPE -->
										<div class="col s12">
											<div class="input-field col s12">
												<select v-model="updateObj.type" required>
													<option value="movie">Movie</option>
													<option value="anime">Animation</option>
													<option value="season">Season</option>
												</select>
												<label :class="updateObj.type ? 'active' : ''">Product Type</label>
											</div>
										</div>
											<!-- CARD NUMBER -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="number" v-model="updateObj.card_num" required>
												<label :class="updateObj.card_num ? 'active' : ''">Card Number</label>
											</div>
										</div>
											<!-- DISCRIPTION -->
										<div class="col s12">
											<div class="input-field col s12">
												<textarea placeholder="Product Discription" v-model="updateObj.discription" required></textarea>
											</div>
										</div>
											<!-- Goggle Drive Download Link -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="text" placeholder="https://drive.google.com/file/d/1sqwF2X8BSvxuTQWmmFk61fz5CERr0WSi/view" v-model="updateObj.drive_url" required>
												<label class="active">Goggle Drive Download Link</label>
											</div>
										</div>
											<!-- YOUTUBE SKU URL -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="text" placeholder="https://www.youtube.com/watch?v=9_e7jmoCYUQ" v-model="updateObj.sku_url" required>
												<label class="active">Find Code Youtube Video URL</label>
											</div>
										</div>
											<!-- SETTING SKU -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="text" v-model="updateObj.sku_code" required @keyup="blobUrls.is_yes_sku = null">
												<label :class="updateObj.sku_code ? 'active':''">Write SKU Code</label>
											</div>
										</div>
										<div class="col s6 pl-4">
											<button @click.prevent="generateSku(10),blobUrls.is_yes_sku = null" class="btn mr-2">Generate SKU</button>
											<button @click.prevent="checkSKU" class="btn" :disabled="!updateObj.sku_code">Testing SKU</button>
										</div>
										<div class="col s6"><h6 :class="blobUrls.is_yes_sku == true ? 'green-text' : blobUrls.is_yes_sku == false ? 'red-text' : ''">{{ updateObj.sku_code }}</h6></div>
											<!-- TAGS -->
										<div class="col s12 mt-3">
											<div class="input-field col s12">
												<h6>Add Product Tags <small class="float-right blue-text">Please enter multiple tags separated by smicolons (,) like Tag 1,Tag 2</small></h6>
												<input type="text" v-model="tagStr" @keypress.enter.prevent="addMyTag" placeholder="enter tags tag1,tag2,tag3">
												<div class="mt-1">
													<button v-for="(key , index) in allTags" :key="index" type="button" class="btn btn-info mt-1 mr-2">{{ key }} <span class="material-icons remover" @click.prevent="allTags.splice(index,1)">close</span></button>
												</div>
											</div>
										</div>
											<!-- PRODUCT CATEGORIES -->
										<div class="col s12">
											<div class="input-field col s9">
												<select v-model="updateObj.catts">
													<option v-for="(obj,index) in allCats" :key="index" :value="index+1">{{ obj.title }}</option>
												</select>
												<label :class="updateObj.catts ? 'active' : ''">Product Categories</label>
											</div>
											<div class="input-field col s3"><button @click.prevent="addMyCatt" class="btn">Add Category</button></div>
										</div>
										<div class="mt-1 pl-4">
											<button v-for="(key , index) in slctCatts" :key="index" type="button" class="btn btn-info mt-1 mr-2">
												{{ key.title }} <span class="material-icons remover" @click.prevent="slctCatts.splice(index,1)">close</span>
											</button>
										</div>
											<!-- SUBMIT -->
										<div class="input-field col s12">
											<button class="btn waves-effect waves-light right" type="submit" name="action">Update <i class="material-icons right">send</i></button>
										</div>
									</form>
								</div>
								<div class="col s3 m3 l3"></div>
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
  				updateObj: {},
  				blobUrls: {pstr_img_url: null,banner_img_url: null,preview_vid_url: null,is_yes_sku:null,},
  				updateVid: false,
  				allCats: [],
  				slctCatts: [],
  				allTags: [],
  				tagStr: null,
  			}
  		},
  		mounted () {
  			this.$axios.get('/api/products/'+this.$route.params.id).then(res => {
  				this.updateObj = res.data;
  				var keys = res.data.tags.split(',');
  				for (var i = 0; i < keys.length; i++) {this.allTags.push(keys[i]);}
  			});
  			this.$axios.get('/api/categoires').then(res => {
  				this.allCats = res.data;
  			});
  			setTimeout(() => {
	  			this.$axios.get(`/api/getById/getProdCats/${this.$route.params.id}`).then(res => {
	  				res.data.filter((el) => {
	  					this.allCats.find(item => item.id === el.cat_id ? this.slctCatts.push(item) : null);
	  				});
	  			});
  			},1500);
  		},
  		methods: {
  			updateMyObj () {
				if (this.allTags.length > 0 && this.slctCatts.length > 0) {
					let data = new FormData();
					Object.entries(this.updateObj).forEach(([key, value]) => {
						data.append(key, value);
					});
					data.append('else_poster', this.updateObj.postr_img);
					data.append('else_banner', this.updateObj.banner_img);
					data.append('else_prv_vid', this.updateObj.preview_vid);
					if (this.blobUrls.pstr_img_url != null) data.append('new_postr_img', this.$refs.postr_img.files[0]);
					if (this.blobUrls.banner_img_url != null) data.append('new_banner', this.$refs.banner_img.files[0]);
					if (this.blobUrls.preview_vid_url != null) data.append('new_prv_vid', this.$refs.preview_vid.files[0]);
					for( var i = 0; i < this.allTags.length; i++ ){
						data.append('tag[' + i + ']', this.allTags[i]);
					}
					for( var i = 0; i < this.slctCatts.length; i++ ){
						data.append('cat[' + i + ']', this.slctCatts[i].id);
					}
					this.$axios.post('/api/products',data).then(res => {
						this.sweatAlert('success','Product is updated successfully');
						if (this.updateObj.type == 'movie') this.$router.push({name: 'movies'});
						if (this.updateObj.type == 'anime') this.$router.push({name: 'anime'});
						if (this.updateObj.type == 'season') this.$router.push({name: 'seasons'});
					});
				}
				else this.sweatAlert('error','Something is missing here!.');
  			},
  			generateSku(len, charSet) {
  				charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  				var randomString = '';
  				for (var i = 0; i < len; i++) {
  					var randomPoz = Math.floor(Math.random() * charSet.length);
  					randomString += charSet.substring(randomPoz,randomPoz+1);
  				}
  				this.updateObj.sku_code = randomString;
  			},
  			checkSKU () {
  				this.$axios.get(`/api/getById/checkSKU/${this.updateObj.sku_code}`).then(res => {
  					if (res.data != 0) this.blobUrls.is_yes_sku = false;
  					else this.blobUrls.is_yes_sku = true;
  				});
  			},
  			addMyCatt () {
  				if (this.updateObj.catts) {
  					var cat_id = this.allCats[this.updateObj.catts-1].id;
  					var index = this.slctCatts.findIndex(x => x.id === cat_id);
  					if (index === -1) this.slctCatts.push(this.allCats[this.updateObj.catts-1]);
  					else this.sweatAlert('error','This item is already exists.Please choose new one.');
  					this.updateObj.catts = null;
  				} else this.sweatAlert('error','Please choose to add');
  			},
  			fileChngPostr(type) {
				if (type == 'poster_img') {
					const file = this.$refs.postr_img.files[0];
					if (file.size) {
						if (file.size > 83000) this.sweatAlert('error','Poster file size should be less than 80kb.');
						else this.blobUrls.pstr_img_url = URL.createObjectURL(file);
					}
				}
				if (type == 'banner_img') {
					const file = this.$refs.banner_img.files[0];
					if (file.size) {
						if (file.size > 370200) this.sweatAlert('error','Banner file size should be less than 300kb.');
						else this.blobUrls.banner_img_url = URL.createObjectURL(file);
					}
				}
				if (type == 'preview_vid') {
					this.blobUrls.preview_vid_url = null;
					setTimeout(() => {
						const file = this.$refs.preview_vid.files[0];
						if (file.size) {
							if (file.size > 10485760) this.sweatAlert('error','Preview video file size should be less than 10mb.');
							else this.blobUrls.preview_vid_url = URL.createObjectURL(file);
						}
					}, 1000);
				}
			},
	  		addMyTag () {
	  			if (this.tagStr) {
	  				var keys = this.tagStr.split(',');
	  				for (var i = 0; i < keys.length; i++) {this.allTags.push(keys[i]);}
	  				this.tagStr = null;
	  			} else this.sweatAlert('error','Please write any keyword to add');
	  		},
  		},
	}
</script>