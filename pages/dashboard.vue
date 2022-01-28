<template>
	<div id="main">
		<div id="card-stats" class="pt-0">
			<div class="row">

				<div class="col s12 m6 l6 xl3">
					<div class="card gradient-45deg-light-blue-cyan gradient-shadow min-height-100 white-text animate fadeLeft">
						<div class="padding-5">
							<div class="row pl-10 pr-10">
								<div class="col s7 m7">
									<p>Categories</p>
									<p>Movies</p>
									<p>Seasons</p>
									<p>Animations</p>
									<p>Games</p>
									<p>Apps</p>
								</div>
								<div class="col s5 m5 right-align">
									<p>{{ catts }}</p>
									<p>{{ movies }}</p>
									<p>{{ seasons }}</p>
									<p>{{ animes }}</p>
									<p>{{ games }}</p>
									<p>{{ apps }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col s12 m6 l6 xl3">
					<div class="card gradient-45deg-light-blue-cyan gradient-shadow min-height-100 white-text animate fadeLeft">
						<div class="padding-5">
							<h5 class="center-align white-text">Subscribers</h5>
							<div class="row pl-10 pr-10">
								<div class="col s7 m7">
									<p>Meet Islam</p>
									<p>Procode Hub</p>
									<p>Coding Tutor</p>
								</div>
								<div class="col s5 m5 right-align">
									<p v-for="obj in scribArr">{{ obj }}</p>
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
  				catts:0,
  				movies:0,
  				seasons:0,
  				animes:0,
  				games:0,
  				apps:0,
  					/*YOUTUBE DATA*/
  				scribArr: [],
  			}
  		},
  		mounted () {
  			this.getData();
  			setTimeout(() => {
  				this.$axios.get(`/api/getById/chSubscribs/${this.apiKey}`).then(res => {
  					this.scribArr = res.data;
  				});
  			}, 800);
  		},
  		methods: {
  			getData () {
  				this.$axios.get('/api/prtalOnlyGet/totalItems').then(res => {
  					this.catts = res.data.catts;
  					this.movies = res.data.movies;
  					this.seasons = res.data.seasons;
  					this.animes = res.data.animes;
  					this.games = res.data.games;
  					this.apps = res.data.apps;
  				});
  			},
  		},
	}
</script>