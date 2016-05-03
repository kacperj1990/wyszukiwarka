loadCategoriesTree = function() {

	var categories = db.categories.find();
	var roots = db.categories.find({parent: 0});

	categories.forEach(function(c){
		if(c.parent === 0) {
			roots.push(c);
		}
	});




};