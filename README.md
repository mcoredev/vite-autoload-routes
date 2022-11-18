# Vite autoload routes from modules Vue 3

Code was modify from https://vitejs.dev/guide/features.html#glob-import

Works in with folders structure in project. This folders structure is good for organized modules with separate logic.

	.
	├── assests                   
	├── components							# common project components 
	├── modules                   
	│	└── clients							# name your module
	│	│	│
	│	│	└── components                  # components module
	│	│	└── pages						# page views module
	│	│	└── stores						# define Pinia store
	│	│	└── ClientsModule.vue			# default first route module
	│	│	└── services.js					# services module
	│	│	│
	│	│	└── routes.js					# routes module
	│	│
	│	└── orders							# another module
	│	│	└── ...
	│	│	└── routes.js
	│	│
	│	└── autoload.js 					# this is source autoload routes from all modules		
	│
	├── views
	├── router
	│	└─ index.js
	└── ...


# Example: Module Clients routes.js

> ./src/modules/nameModule/routes.js

This code is almost same in every module only change name and additinng pages

```
import ClientModule from './ClientModule.vue'

import ClientListPage from '@/modules/clients/pages/ClientListPage.vue'
import ClientNewPage from '@/modules/clients/pages/ClientNewPage.vue'
import ClientEditPage from '@/modules/clients/pages/ClientEditPage.vue'

const ClientRoutes = [
	{
		path: '/client',
		name: 'module.client',
		component: ClientModule,
		children: [
			{
			 	path: 'list',
			 	name: 'module.client.list',
			 	component: ClientListPage
			 },
			 {
			 	path: 'new',
			 	name: 'module.client.new',
			 	component: ClientNewPage
			 },
			 {
			 	path: '/client/:id',
			 	name: 'module.client.edit',
			 	component: ClientEditPage
			 }
		],
	}
]

export default ClientRoutes

```

# Example: Main Router index.js

> ./src/router/index.js

```
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import routesModule from '@/modules/autoload.js'

const routes =  [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
	...routesModule
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

```

# License
MIT