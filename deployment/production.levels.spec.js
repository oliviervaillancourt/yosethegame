var ProductionDatabase = require('../public/js/production.database');
var fs = require('fs');
var array = require('../public/js/utils/array.utils');

describe('Production Levels:', function() {
	
	var database;
	
	beforeEach(function() {
		database = new ProductionDatabase();
	});

    describe('Ids:', function() {
	
        it('All challenges must have an id', function() {
			array.forEach(database.worlds, function(world) {
				array.forEach(world.levels, function(level) {
					expect(level.id).toBeDefined();
				});
			});
	    });
    });
    
    describe('Titles:', function() {
	
        it('All challenges must have a title', function() {
			array.forEach(database.worlds, function(world) {
				array.forEach(world.levels, function(level) {
					expect(level.title).toBeDefined();
				});
			});
	    });
    });
    
    describe('Files:', function() {
	
        it('All challenges must have a file', function() {
			array.forEach(database.worlds, function(world) {
				array.forEach(world.levels, function(level) {
					if (!fs.existsSync(level.file)) {
						throw 'File "' + level.file + '" of level "' + level.title + '" not found';
					}
				});
    	    });
	    });
    });
    
    describe('Requesters:', function() {
	
        it('All requesters can be required from public/js and provide an url() api', function() {
			array.forEach(database.worlds, function(world) {
				array.forEach(world.levels, function(level) {
        			var Requester = require('../public/js/' + level.requester);
                	var requester = new Requester();
                	if (requester.url == undefined) {
                		throw 'Requester ' + level.requester + ' of level "' + level.title + '" should have an url() method';
                	}
				});
    	    });
	    });
    });
    
    describe('Checkers:', function() {
    
	    it('All checkers can be required from public/js and provide a validate api', function() {
			array.forEach(database.worlds, function(world) {
				array.forEach(world.levels, function(level) {
        			var checker = require('../public/js/' + level.checker);
                	if (checker.validate == undefined) {
                		throw 'Checker ' + level.checker + ' of level "' + level.title + '" should have a validate() method';
                	}
				});
    	    });
        });
    });

	
});