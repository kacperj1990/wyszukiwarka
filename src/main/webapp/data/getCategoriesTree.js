db.system.js.save({
	_id: "getCategoriesTree",
	value: function() {


		var categories = db.categories.find().toArray();

		var findChild = function(child) {
			return categories.filter(function(c) {
				return c._id == child;
			})[0];
		};



		var getTree = function(node, parent) {
			node.children.forEach(function(c) {
				var obj = findChild(c);
				if(obj) {
					var newParent = {
						'id': obj._id,
						'title': obj._id,
						'nodes': []
					};
					parent.nodes.push(newParent);
					getTree(obj, newParent);
				}
			});
		};



		var getCategoriesTree = function(allCategories) {
			
			var categoriesTree = [];
			var roots = allCategories.filter(function(c){ return c.isRoot; });
			
			roots.forEach(function(r) {
				var category = {};
				category['id'] = r['_id'];
				category['title'] = r['_id'];
				category['nodes'] = [];

				getTree(r, category);
				categoriesTree.push(category);
			});

			return categoriesTree;
		};

		return getCategoriesTree(categories);
	}
});