import config from '../../environment'
import fireBase from 'firebase-admin';

class Firebase {
	constructor(table) {
		this.table = table
	}
	
	initDatabase(){
		let fireBaseInit = fireBase.initializeApp({
			credential: fireBase.credential.cert(config.firebase_config),
			databaseURL: config.firebase_url
		});
			
		return fireBaseInit.database().ref(config.firebase_db_name).child(this.table)
	}
}

module.exports = Firebase;
