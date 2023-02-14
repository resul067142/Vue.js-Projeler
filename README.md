# sosyalpuanlama

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


```javascript
gonderi:{
	user:{},
	post:{
		baslik:'',
		aciklama:'',
		foto:''
	},
	comments:[
		{	user:{},
			commentText:"",
			comments:[]
		}
	],
	likes:{[{user:{},puan:5}]}
}


user:{
    	email:"",
            nameSurname:"",
            pass:"",
            photo:"",
            kendiniTanit:{
                baslik:"",
                kisaAciklama:"",
                lakap:"",
            },
            yetenekler:[
				{
					yetenekAdi:"",
					yetenekPuani:1-10
				}
			],
            projeler:[
				{projeAdi:"",baslangicTarihi:"",bitisTarihi:"",kisaAciklama:""}
			],
            kaynakLinkler:["https"],
            sosyalMedyaLinkleri:[
				{type:'facebook',link:''}
			],
            guid:guid
}


		
```