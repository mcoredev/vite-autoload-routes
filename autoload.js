let routesModule = []
const modules = await import.meta.glob('./**/routes.js')

for (const path in modules) {
	let routes = modules[path]().then((mod) => {
		return mod.default[0]
	})
	routesModule.push(await routes)
}

export default routesModule