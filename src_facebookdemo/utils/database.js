var SQLite = require('react-native-sqlite-storage');

let instance = null;
export default class Database {

	constructor(DB_NAME) {
		if (!instance) {
			console.log("[Database:instance] open connect database");
			this.db = this.open(DB_NAME);
			instance = this;
		}

		return instance;	
	}

	open(DB_NAME) {
		return SQLite.openDatabase({ name: DB_NAME, location: 'Library' }, this.openCB, this.errorCB);
	}

	execute(query, params, callback) {
		this.db.executeSql(query, params, callback);
	}

	executeTrans(query, params, callback) {
		this.db.transaction((tx) => {
			tx.executeSql(query, params, callback);
		});
	}
 
	errorCB(err) {
		console.error("SQL Error: " + err);
	}

	successCB() {
		console.log("SQL executed fine");
	}

	openCB() {
		console.log("Database OPENED");
	}
}