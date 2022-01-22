export default {

	data () {
		return {

			stteperPgIndx : 1,
			manu_script_id: null,
			is_next: null,
			is_view_com: null,
			allManScrpt: {},

			allJournals: [],
			allJournalSecs: [],	
			allIssueArtcleTyp: [],
			allIssues: [],

			aStep1Data: { j_id: null,step: 'step1', },
			keywordTxt: null,
			allKewords: [],
			prevString: null,

			aStep2Data: { a_no_tables: 0,a_no_figures: 0,step: 'step2', },
			allAddFiles: [],
			allFigFiles: [],
			docFileArr: {},
			cvrFileArr: {},
			graAbstArr: {},
			figureFName: '',
			cvr_ltr_text: '',

			aStep3Data: [ {title_h:'Mr.',email:null,frist_n:null,last_n:null,step: 'step3',cross_authr:1,} ],
			newAuthrAdd: {title_h:'Mr.',step: 'step3',cross_authr:0,},
			updateAuthr: {},
			allScrpAuthr: [],

			aStep4IncData: [ {step: 'step4',action_typ: 'inc reviewer',title_h:'Mr.',} ],
			newIncRewrAdd: {step: 'step4',action_typ: 'inc reviewer',title_h:'Mr.',},
			updIncRewr: {},
			allIncRevwr: [],

			aStep4ExcData: [ {step: 'step4',action_typ: 'exc reviewer',title_h:'Mr.'} ],
			newExcRewrAdd: {step: 'step4',action_typ: 'exc reviewer',title_h:'Mr.'},
			updExcRewr: {},
			allExcRevwr: [],

			aStep5Data: {step: 'step5',manu_script_id:null,},

		}
	},

	methods: {
			/*JOURNAL , SECTIONS , ISSUE , ARTICLE TYPE*/
		getAllJournals () {
			this.$axios.get('/api/JournalContrlr').then(res => {
				this.allJournals = res.data
			});
		},
		getJournalSecs () {
			this.$axios.get('api/getJournalSecs/'+this.aStep1Data.j_id).then(res => {
				this.allJournalSecs = res.data;
			});
		},
		getJSecIssues () {
			this.$axios.get('api/getJSecIssues/'+this.aStep1Data.j_sec_id).then(res => {
				this.allIssues = res.data;
			});
		},
		getIssueArtcleTyp () {
			this.$axios.get('api/getIssueArtcleTyp/'+this.aStep1Data.sp_issue_id).then(res => {
				this.allIssueArtcleTyp = res.data;
			});
		},
			/*ALL STEP FORM POSTING CODE*/
		articleStep1Post () {
			if (this.allKewords.length < 6) this.swalfire('error','6 keywords are required.');
			else {
				if (this.manu_script_id) {
					this.$axios.patch('api/manuScriptContrlr/'+this.manu_script_id,this.aStep1Data).then(res => {
						this.swalfire('success','Form data is saved successfully.');
						/*UPDATING KEYWORDS AND FILES ARRAY*/
						this.uploadKywrds(this.manu_script_id);
						this.getAllAddFiles(this.manu_script_id);
						this.getAllMyFiles(this.manu_script_id);
					});
				} else {
					this.$axios.post('api/manuScriptContrlr',this.aStep1Data).then(res => {
						this.manu_script_id = res.data;
						this.swalfire('success','Form data is saved successfully.');
						/*UPDATING KEYWORDS AND FILES ARRAY*/
						this.uploadKywrds(res.data);
						this.getAllAddFiles(res.data);
						this.getAllMyFiles(res.data);
					});
				}
			}
		},
		articleStep2Post () {
			if (this.docFileArr.doc_file_n && this.graAbstArr.graph_abst_f_path) {
				this.$axios.patch('api/manuScriptContrlr/'+this.manu_script_id,this.aStep2Data).then(res => {
					this.swalfire('success','Form data is saved successfully.');
					this.is_next = true;
				});
			} else this.swalfire('error','Please add docx , graphical abstract and figure file');
		},
		articleStep3Post () {
			for (var i = 0; i < this.aStep3Data.length; i++) {
				this.$axios.patch('api/manuScriptContrlr/'+this.manu_script_id,this.aStep3Data[i]).then(res => {
					if (res.data == 0) this.swalfire('error','This email is already taken as manu script author role.');
					else this.swalfire('success','Form data is saved successfully.');
				});
			}
			setTimeout(() => {
				this.getScrpAuthr();
			},2000);
		},
		addNewAuthr () {
			this.$axios.patch('api/manuScriptContrlr/'+this.manu_script_id,this.newAuthrAdd).then(res => {
				if (res.data == 0) this.swalfire('error','This email is already taken as manu script author role.');
				else this.swalfire('success','Form data is saved successfully.');
				this.getScrpAuthr();
				this.newAuthrAdd = {title_h:'Mr.',step: 'step3',cross_authr:0,};
			});
		},
		articleStep4Post () {
			for (var i = 0; i < this.aStep4IncData.length; i++) {
				this.$axios.patch('api/manuScriptContrlr/'+this.manu_script_id,this.aStep4IncData[i]).then(res => {
					if (res.data == 0) {
						this.swalfire('error','This email is already taken.');
					} else if (res.data == 2) {
						this.swalfire('error','This is your email');
					} else {
						this.swalfire('success','Form is saved successfully.');
					}
				});
			}
			setTimeout(() => {
				for (var i = 0; i < this.aStep4ExcData.length; i++) {
					if (this.aStep4ExcData[i].email) {
						this.$axios.patch('api/manuScriptContrlr/'+this.manu_script_id,this.aStep4ExcData[i]).then(res => {
							if (res.data == 0) {
								this.swalfire('error','This email is already taken.');
							} else if (res.data == 2) {
								this.swalfire('error','This is your email');
							} else {
								this.swalfire('success','Form is saved successfully.');
							}
						});
					}
				}
			},1000);
			setTimeout(() => {
				this.getIncRevwr();
				this.getExcRevwr();
			},4000);
		},
		articleStep5Post () {
			this.aStep5Data.manu_script_id = this.manu_script_id;
			if (this.aStep5Data.accept_terms) {
				this.$axios.post('api/manuScriptContrlr',this.aStep5Data).then(res => {
					this.swalfire('success','Last step is completed successfully.');
				});
				this.aStep5Data.con_typ_text = null;
			} else this.swalfire('error','Accepted all terms and conditions');
		},
			/*GET & ADD & UPDATE AUTHOR,INC REVIEWERS,EXC REVIEWERS*/
		getScrpAuthr () {
			this.$axios.get('/api/do_m_scrpt_code/getScrpAuthr/'+this.manu_script_id).then(res => {
				this.allScrpAuthr = res.data;
			});
		},
		getIncRevwr () {
			this.$axios.get('/api/do_m_scrpt_code/getIncRevwr/'+this.manu_script_id).then(res => {
				this.allIncRevwr = res.data;
			});
		},
		getExcRevwr () {
			this.$axios.get('/api/do_m_scrpt_code/getExcRevwr/'+this.manu_script_id).then(res => {
				this.allExcRevwr = res.data;
			});
		},
		updateAuthrFunc () {
			this.$axios.post('api/updScrpUser/'+this.updateAuthr.id,this.updateAuthr).then(res => {
				if (res.data == 0) this.swalfire('error','This email is already taken as manu script author role.');
				else {
					this.swalfire('success','Form data is saved successfully.');
					this.getScrpAuthr();
					this.updateAuthr = {};
				}
			});
		},
		updateIncRewer () {
			this.$axios.post('api/updScrpUser/'+this.updIncRewr.id,this.updIncRewr).then(res => {
				if (res.data == 0) this.swalfire('error','This email is already taken as manu script include reviewer role.');
				else {
					this.swalfire('success','Form data is saved successfully.');
					this.getIncRevwr();
					this.updIncRewr = {};
				}
			});
		},
		updateExcRewer () {
			this.$axios.post('api/updScrpUser/'+this.updExcRewr.id,this.updExcRewr).then(res => {
				if (res.data == 0) this.swalfire('error','This email is already taken as manu script exclude reviewer role.');
				else {
					this.swalfire('success','Form data is saved successfully.');
					this.getExcRevwr();
					this.updExcRewr = {};
				}
			});
		},
		addIncRewr () {
			this.$axios.patch('api/manuScriptContrlr/'+this.manu_script_id,this.newIncRewrAdd).then(res => {
				if (res.data == 0) {
					this.swalfire('error','This email is already taken.');
				} else if (res.data == 2) {
					this.swalfire('error','This is your email');
				} else {
					this.swalfire('success','Form is saved successfully.');
					this.getIncRevwr();
					this.newIncRewrAdd = {step: 'step4',action_typ: 'inc reviewer',title_h:'Mr.',};
				}
			});
		},
		addExcRewr () {
			this.$axios.patch('api/manuScriptContrlr/'+this.manu_script_id,this.newExcRewrAdd).then(res => {
				if (res.data == 0) {
					this.swalfire('error','This email is already taken.');
				} else if (res.data == 2) {
					this.swalfire('error','This is your email');
				} else {
					this.swalfire('success','Form is saved successfully.');
					this.getExcRevwr();
					this.newExcRewrAdd = {step: 'step4',action_typ: 'exc reviewer',title_h:'Mr.'};
				}
			});
		},
			/*STEP - 1 SUPPORTED CODE*/
		maxlengthCheck (element, maxvalue,type) {
			var q = element.split(/[\s]+/).length;
			if(q > maxvalue){
				this.swalfire('success','You are crossing the required '+maxvalue+' words limit.');
				if (type == 'ATitle') this.aStep1Data.title = this.prevString;
				else if (type == 'ARtitle') this.aStep1Data.a_title = this.prevString;
				else if (type == 'AAbscract') this.aStep1Data.abstract = this.prevString;
			} else this.prevString = element;
		},
		addMyKeword () {
			if (this.keywordTxt) {
				var keys = this.keywordTxt.split(';');
				for (var i = 0; i < keys.length; i++) {
					if (this.allKewords.length >= 10) {
						this.swalfire('error','You are crossing the required 10 words limit.');
					} else {
						this.allKewords.push(keys[i]);
					}
				}
				this.keywordTxt = null;
			} else this.swalfire('error','Please write any keyword to add');
		},
		uploadKywrds (scrpt_id) {
			let formData = new FormData();
			formData.append("step", 'myKeywords');
			formData.append("script_id", scrpt_id);
			for( var i = 0; i < this.allKewords.length; i++ ){
				formData.append('keyword[' + i + ']', this.allKewords[i]);
			}
			this.$axios.post('api/manuScriptContrlr',formData);
		},
			/*STEP - 2 SUPPORTED CODE*/
		getAllMyFiles (scrpt_id) {
			this.$axios.get('api/getAllMyFiles/'+scrpt_id).then(res => {
				this.docFileArr = res.data.doc_file;
				this.graAbstArr = res.data.graAbstArr;
				if (res.data.cvrFileArr.cvr_ltr_txt != '') this.cvrFileArr.cvr_f_path = res.data.cvrFileArr.cvr_f_path;
				else this.aStep2Data.cvr_ltr_text = res.data.cvrFileArr.cvr_ltr_txt;
				this.allFigFiles = res.data.fig_files;
				if (res.data.doc_file.doc_file_n) this.is_next = true;
			});
		},
		getAllAddFiles (scrpt_id) {
			this.$axios.get('api/getAllAddFiles/'+scrpt_id).then(res => {
				this.allAddFiles = res.data;
			});
		},
		uploadAddFiles () {
			let formData = new FormData();
			formData.append("step", 'step2');
			formData.append("manu_script_id", this.manu_script_id);
			for( var i = 0; i < this.$refs.a_mutli_files.files.length; i++ ){
				let multi_file = this.$refs.a_mutli_files.files[i];
				formData.append('a_mutli_files[' + i + ']', multi_file);
			}
			this.$axios.post('api/manuScriptContrlr',formData).then(res => {
				this.swalfire('success','Additional files are added successfully.');
				this.getAllAddFiles(this.manu_script_id);
			});
		},
		uploadDocFile () {
			let formData = new FormData();
			formData.append("a_doc_file", this.$refs.a_doc_file.files[0]);
			formData.append("step", 'step2');
			formData.append("manu_script_id", this.manu_script_id);
			this.$axios.post('api/manuScriptContrlr',formData).then(res => {
				this.swalfire('success','Docx file is added successfully.');
				this.docFileArr = res.data;
			});
		},
		uploadCvrFile () {
			let formData = new FormData();
			formData.append("cvr_ltr_f", this.$refs.cvr_ltr_f.files[0]);
			formData.append("step", 'step2');
			formData.append("manu_script_id", this.manu_script_id);
			this.$axios.post('api/manuScriptContrlr',formData).then(res => {
				this.swalfire('success','Cover letter file is added successfully.');
				this.cvrFileArr = res.data;
			});
		},
		uploadAbstractFile () {
			let formData = new FormData();
			formData.append("graphical_abstract", this.$refs.graphical_abstract.files[0]);
			formData.append("step", 'step2');
			formData.append("manu_script_id", this.manu_script_id);
			this.$axios.post('api/manuScriptContrlr',formData).then(res => {
				this.swalfire('success','Graphical abstract file is added successfully.');
				this.graAbstArr = res.data;
			});
		},
		uploadFigFiles () {
			if (this.figureFName != '') {
				let formData = new FormData();
				formData.append("a_figure_pic", this.$refs.a_figure_pic.files[0]);
				formData.append("step", 'step2');
				formData.append("manu_script_id", this.manu_script_id);
				formData.append("fig_f_name", this.figureFName);
				this.$axios.post('api/manuScriptContrlr',formData).then(res => {
					this.swalfire('success','Figure file is added successfully.');
					this.allFigFiles.push(res.data);
					this.figureFName = '';
				});
			} else {
				this.swalfire('error','Please enter file name');
			}
		},
			/*DELETE MULTIPLE CODE*/
		deleteFunc (row_id,action_type,index) {
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
					this.$axios.get('/api/do_m_scrpt_code/'+action_type+'/'+row_id).then(res => {
						if (res.data == 1) {
							if (action_type == 'delAddFiles') this.allAddFiles.splice(index, 1);
							if (action_type == 'delFigFiles') this.allFigFiles.splice(index, 1);
							if (action_type == 'delAuthr') this.allScrpAuthr.splice(index, 1);
							if (action_type == 'delIncRewr') this.allIncRevwr.splice(index, 1);
							if (action_type == 'delExcRewr') this.allExcRevwr.splice(index, 1);
							if (action_type == 'delCvrLtrFle') this.cvrFileArr = {};
						}
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
			/*STEP - 3 SUPPORTED CODE*/
		chngSwithCheck (index) {
			var counter = 0;
			this.aStep3Data.map(el => {
				if (el.cross_authr == 1) {
					counter += 1;
				}
			});
			if (counter > 1) {
				setTimeout(() => {
					this.aStep3Data[index].cross_authr = 0;
					this.swalfire('error','One corresponding author is choosed already.');
				},600);
			}
		},
		swithOldAuthr (type) {
			var counter = 0;
			this.allScrpAuthr.map(el => {
				if (el.cross_authr == 1) {
					counter += 1;
				}
			});
			if (type == 'prevAuthr') {
				if (counter > 1) {
					setTimeout(() => {
						this.updateAuthr.cross_authr = 0;
						this.swalfire('error','One corresponding author is choosed already.');
					},600);
				}
			}
			if (type == 'newAuthr') {
				if (counter == 1) {
					setTimeout(() => {
						this.newAuthrAdd.cross_authr = 0;
						this.swalfire('error','One corresponding author is choosed already.');
					},600);
				}
			}
		},
			/*VIEW COMP AND FORM COMP SUPPORT FUNC*/
		showViewComp (type) {
			this.$axios.get('api/do_m_scrpt_code/getThisScrpt/'+this.manu_script_id).then(res => {
				if (type == 'add') {
					this.allManScrpt = res.data.data;
					this.is_view_com = true;
				} else this.$emit('rowFunc','AuthorManuscriptView',res.data.data);
			});
		},
		goList (type) {
			if (type == 'AuthorManuscriptUpdate') this.is_view_com = null;
			if (type == 'AuthorManuscriptList') this.$router.push({name : 'admin-author-manuscripts'});
		},
	},
	
}
