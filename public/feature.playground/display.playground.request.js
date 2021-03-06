var url         = require('url');
var fs          = require('fs');
var cheerio     = require('cheerio');
var array       = require('../js/utils/array.utils');
var withValue   = require('../js/utils/array.matchers');
var thePlayer   = require('../js/utils/player.utils');

var fillBannerWithGreetings = require('../js/banner');
var exitWithMessage         = require('../js/exit.with.message');

var fillBanner = function(page, player, world, worldNumber) {
	var levelIndex = thePlayer.nextLevelIndexInThisWorld(player, world);
	var level = world.levels[levelIndex];
	var greetings = 'level ' + worldNumber + '.' + (levelIndex + 1) + ' : ' + level.title;
	
	fillBannerWithGreetings(page, player, greetings);
};

playground = function(request, response, database) {
	var html = fs.readFileSync('./public/feature.playground/playground.html').toString();
	var banner = cheerio.load(fs.readFileSync('./public/feature.dashboard/banner.html').toString())('#sidebar').html();
	var page = cheerio.load(html);
	page('#sidebar').empty().append(banner);
	
	var login = /^\/players\/(.*)\/play/.exec(request.url)[1];
	var worldNumber = parseInt(/^\/players\/(.*)\/play\/world\/(.*)/.exec(request.url)[2]);
	var world = database.worlds[worldNumber - 1];
	if (world === undefined) {
		return exitWithMessage('this world is unknown', page, response);
	}

	database.find(login, function(player) {

		if (player === undefined) {
			return exitWithMessage('this player is unknown', page, response);
		}	
		
		if (!world.isOpenFor(player)) {
			return exitWithMessage('this world is locked', page, response);
		}
		
		if (thePlayer.hasCompletedThisWorld(player, world)) {
			page('#next-challenge').addClass('hidden').removeClass('visible');
			page('#result').addClass('hidden').removeClass('visible');
			page('#world-completed').addClass('visible').removeClass('hidden');
			response.write(page.html());
			response.end();
			return;
		}
			
		page('#login').empty().text(player.login);
			
		fillBanner(page, player, world, worldNumber);
		
		var level = thePlayer.nextLevelInThisWorld(player, world);
		page('#next-challenge-title').text(level.title);
		if (level.file !== undefined) {
			var challenge = cheerio.load(fs.readFileSync(level.file).toString());
			page('#next-challenge-content').empty().append(challenge('#challenge-content').html());
		}
		page('#try').attr('onclick', 'new TryListener().try(' + worldNumber + ')');

		page('#continue-link').attr('href', '/players/' + player.login);

		response.write(page.html());
		response.end();
	});
	
};

module.exports = playground;