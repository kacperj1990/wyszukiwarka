db.system.js.save({
	_id: "searchQuery",
	value: function(query) {
		
		var regexpQuery = new RegExp(query, 'i');

		return db.companies.find(
			{
				$or: [ {companyName: regexpQuery}, {categories: regexpQuery} ]
			}).toArray();
	}
});