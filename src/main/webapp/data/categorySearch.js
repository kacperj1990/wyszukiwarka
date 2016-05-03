db.system.js.save({
	_id: "searchByCategory",
	value: function(query) {
		return db.companies.find({categories: query}).toArray();
	}
});