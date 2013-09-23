var PSql = require('./psql.database');

function ProductionDatabase() {
	this.levels = [
		{
			number: 1,
			name: 'Get ready',
			challenges: [
				{
					title: 'The ping challenge',
					file: 'public/challenge.ping/ping.html',
					requester: '../challenge.ping/ping.requester.js',
					checker: '../challenge.ping/ping.response.matcher.js'
				},
			]
		},
		{
			number: 2,
			name: 'Prime factors decomposition',
			challenges: [
				{
					title: 'Power of two challenge',
					file: 'public/challenge.power.of.two/power.of.two.html',
					requester: '../challenge.power.of.two/power.of.two.requester.js',
					checker: '../challenge.power.of.two/power.of.two.response.matcher.js'
				},
				{
					title: 'Guard challenge',
					file: 'public/challenge.guard.string/guard.html',
					requester: '../challenge.guard.string/guard.requester.js',
					checker: '../challenge.guard.string/guard.response.matcher.js',
				},
				{
					title: 'Decomposition challenge',
					file: 'public/challenge.decomposition/decomposition.html',
					requester: '../challenge.decomposition/decomposition.requester.js',
					checker: '../challenge.decomposition/decomposition.response.matcher.js',
				}
			]
		},
		{
			number: 3,
			name: 'GUI',
			challenges: [
				{
					title: 'Form challenge',
					file: 'public/challenge.form/form.html',
					requester: '../challenge.form/form.requester.js',
					checker: '../challenge.form/form.response.matcher.js'
				},
				{
					title: 'Input challenge',
					file: 'public/challenge.input/input.html',
					requester: '../challenge.form/form.requester.js',
					checker: '../challenge.input/input.response.matcher.js'
				}
			]
		}
	];
};

ProductionDatabase.prototype = new PSql(process.env.DATABASE_URL);

module.exports = ProductionDatabase;