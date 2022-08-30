const envConfig = {
	local: {
		apiBaseURI: 'http://localhost:3000/api/',
		clientBaseURI: 'http://localhost:8080/',
		// wsBaseURI: 'ws://localhost:3001/ws',
	},
	dev: {
		apiBaseURI: 'http://localhost:3000/api/',
		clientBaseURI: 'http://localhost:8080/',
	},
	prod: {
		apiBaseURI: 'http://localhost:3000/api/',
		clientBaseURI: 'http://localhost:8080/',
	}
};

let config;
switch (process.env.VUE_APP_CONFIG) {
	case 'local':
		config = envConfig.local;
		break;
	case 'dev':
		config = envConfig.dev;
		break;
	case 'prod':
		config = envConfig.prod;
		break;
	default:
		config = envConfig.local;
}

console.log('V220720.0000', process.env, config);

export default Object.freeze(config);
