<template>
	<div id="main">
		<div class="row">
				<!-- MY PAGE TITLE -->
			<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image" style="background-image: url(admin/images/gallery/breadcrumb-bg.jpg);">
				<div class="container">
					<div class="row">
						<div class="col s12 m6 l6">
							<h5 class="breadcrumbs-title mt-0 mb-0"><span>Add Your Products <small class="ml-2">Movies ({{ movies }}) , Seasons ({{ seasons }}) , Animations ({{ animes }})</small></span></h5>
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
									<form id="addForm" class="row" @submit.prevent="addMyObj">
											<!-- TITLE -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="text" v-model="addObj.title" required>
												<label>Product Title</label>
											</div>
										</div>
											<!-- POSTER IMAGE -->
										<div class="col s12">
											<div class="input-field col s12">
												<small class="blue-text">Poster image dimensions should be 220 x 330 and size should be less than 80kb</small>
												<div class="file-field input-field">
													<div class="btn">
														<span>Poster Image</span>
														<input type="file" accept="image/*" ref="postr_img" @change="fileChngPostr('poster_img')" required>
													</div>
													<div class="file-path-wrapper">
														<input class="file-path validate valid" type="text">
													</div>
												</div>
											</div>
										</div>
										<div v-if="blobUrls.pstr_img_url" class="col s12 div_img"><img :src="blobUrls.pstr_img_url"></div>
											<!-- BANNER IMAGE -->
										<div class="col s12">
											<div class="input-field col s12">
												<small class="blue-text">Banner image dimensions should be 1920 x 708 and size should be less than 300kb</small>
												<div class="file-field input-field">
													<div class="btn">
														<span>Banner Image</span>
														<input type="file" accept="image/*" ref="banner_img" @change="fileChngPostr('banner_img')" required>
													</div>
													<div class="file-path-wrapper">
														<input class="file-path validate valid" type="text">
													</div>
												</div>
											</div>
										</div>
										<div v-if="blobUrls.banner_img_url" class="col s12 div_img"><img :src="blobUrls.banner_img_url"></div>
											<!-- PREVIEW VIDEO -->
										<div class="col s12">
											<div class="input-field col s12">
												<small class="blue-text">Preview video size should be less than 10mb</small>
												<div class="file-field input-field">
													<div class="btn">
														<span>Preview Video</span>
														<input type="file" accept="video/*" ref="preview_vid" @change="fileChngPostr('preview_vid')" required>
													</div>
													<div class="file-path-wrapper">
														<input class="file-path validate valid" type="text">
													</div>
												</div>
											</div>
										</div>
										<div v-if="blobUrls.preview_vid_url" class="col s12 div_img">
											<video width="320" height="240" controls>
												<source :src="blobUrls.preview_vid_url" type="video/mp4">
												<source :src="blobUrls.preview_vid_url" type="video/ogg">
												Your browser does not support the video tag.
											</video>
										</div>
											<!-- RATING -->
										<div class="col s12">
											<div class="input-field col s12">
												<select v-model="addObj.rating" required>
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
												<label :class="addObj.rating ? 'active' : ''">Product Rating</label>
											</div>
										</div>
											<!-- TYPE -->
										<div class="col s12">
											<div class="input-field col s12">
												<select v-model="addObj.type" required>
													<option value="movie">Movie</option>
													<option value="anime">Animation</option>
													<option value="season">Season</option>
												</select>
												<label :class="addObj.type ? 'active' : ''">Product Type</label>
											</div>
										</div>
											<!-- CARD NUMBER -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="number" v-model="addObj.card_num" required>
												<label :class="addObj.card_num ? 'active' : ''">Card Number</label>
											</div>
										</div>
											<!-- DISCRIPTION -->
										<div class="col s12">
											<div class="input-field col s12">
												<textarea placeholder="Product Discription" v-model="addObj.discription" required></textarea>
											</div>
										</div>
											<!-- Goggle Drive Download Link -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="text" placeholder="https://drive.google.com/file/d/1sqwF2X8BSvxuTQWmmFk61fz5CERr0WSi/view" v-model="addObj.drive_url" required>
												<label class="active">Goggle Drive Download Link</label>
											</div>
										</div>
											<!-- YOUTUBE SKU URL -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="text" placeholder="https://www.youtube.com/watch?v=9_e7jmoCYUQ" v-model="addObj.sku_url" required>
												<label class="active">Find Code Youtube Video URL</label>
											</div>
										</div>
											<!-- SETTING SKU -->
										<div class="col s12">
											<div class="input-field col s12">
												<input type="text" v-model="addObj.sku_code" required @keyup="blobUrls.is_yes_sku = null">
												<label :class="addObj.sku_code ? 'active':''">Write SKU Code</label>
											</div>
										</div>
										<div class="col s6 pl-4">
											<button @click.prevent="generateSku(10),blobUrls.is_yes_sku = null" class="btn mr-2">Generate SKU</button>
											<button @click.prevent="checkSKU" class="btn" :disabled="!addObj.sku_code">Testing SKU</button>
										</div>
										<div class="col s6"><h6 :class="blobUrls.is_yes_sku == true ? 'green-text' : blobUrls.is_yes_sku == false ? 'red-text' : ''">{{ addObj.sku_code }}</h6></div>
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
												<select v-model="addObj.catts">
													<option v-for="(obj,index) in allCats" :key="index" :value="index+1">{{ obj.title }}</option>
												</select>
												<label :class="addObj.catts ? 'active' : ''">Product Categories</label>
											</div>
											<div class="input-field col s3"><button @click.prevent="addMyCatt" class="btn">Add Category</button></div>
										</div>
										<div class="mt-1 pl-4">
											<button v-for="(key , index) in slctCatts" :key="index" type="button" class="btn btn-info mt-1 mr-2">
												{{ key.title }} <span class="material-icons remover" @click.prevent="allCats.unshift(key),slctCatts.splice(index,1)">close</span>
											</button>
										</div>
											<!-- SUBMIT -->
										<div class="input-field col s12 pr-4">
											<button class="btn waves-effect waves-light right" type="submit" name="action">Submit <i class="material-icons right">send</i></button>
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
  				addObj: {sku_code:null,},
  				blobUrls: {pstr_img_url: null,banner_img_url: null,preview_vid_url: null,is_yes_sku:null,},
  				allCats: [],
  				slctCatts: [],
  				allTags: [],
  				tagStr: null,
  					/*TOTAL*/
  				movies:0,
  				seasons:0,
  				animes:0,
  				games:0,
  				apps:0,
  			}
  		},
  		mounted () {
  			this.getData();
  		},
  		methods: {
  			addMyObj () {
  				if (this.allTags.length > 0 && this.slctCatts.length > 0) {
  					let data = new FormData();
	  				Object.entries(this.addObj).forEach(([key, value]) => {
	  					data.append(key, value);
	  				});
	  				data.append('postr_img', this.$refs.postr_img.files[0]);
	  				data.append('banner_img', this.$refs.banner_img.files[0]);
	  				data.append('preview_vid', this.$refs.preview_vid.files[0]);
	  				for( var i = 0; i < this.allTags.length; i++ ){
	  					data.append('tag[' + i + ']', this.allTags[i]);
	  				}
	  				for( var i = 0; i < this.slctCatts.length; i++ ){
	  					data.append('cat[' + i + ']', this.slctCatts[i].id);
	  				}
	  				this.$axios.post('/api/products',data).then(res => {
	  					this.sweatAlert('success','Product is added successfully');
	  					this.addObj = {sku_code:null,};
	  					this.blobUrls = {pstr_img_url: null,banner_img_url: null,preview_vid_url: null,is_yes_sku:null,};
	  					this.getData();
	  					this.slctCatts = [];
	  					this.allTags = [];
	  					this.tagStr = null;
	  					document.getElementById('addForm').reset();
	  				});
  				}
  				else this.sweatAlert('error','Something is missing here!.');
  			},
  			getData () {
  				this.$axios.get('/api/prtalOnlyGet/totalItems').then(res => {
  					this.movies = res.data.movies;
  					this.seasons = res.data.seasons;
  					this.animes = res.data.animes;
  					this.games = res.data.games;
  					this.apps = res.data.apps;
  				});
  				this.$axios.get('/api/categoires').then(res => {
  					this.allCats = res.data;
  				});
  			},
  			generateSku(len, charSet) {
  				charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  				var randomString = '';
  				for (var i = 0; i < len; i++) {
  					var randomPoz = Math.floor(Math.random() * charSet.length);
  					randomString += charSet.substring(randomPoz,randomPoz+1);
  				}
  				this.addObj.sku_code = randomString;
  			},
  			checkSKU () {
  				this.$axios.get(`/api/getById/checkSKU/${this.addObj.sku_code}`).then(res => {
  					if (res.data != 0) this.blobUrls.is_yes_sku = false;
  					else this.blobUrls.is_yes_sku = true;
  				});
  			},
  			addMyCatt () {
  				if (this.addObj.catts) {
  					this.slctCatts.push(this.allCats[this.addObj.catts-1]);
  					this.allCats.splice(this.addObj.catts-1,1);
  					this.addObj.catts = null;
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