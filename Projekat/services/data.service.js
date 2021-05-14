"use strict";

const DbService = require("../mixins/db.mixin");

module.exports = {
	name: "data",
	mixins: [
		DbService("beach-water-quality")
	],
	settings: {
        fields:["_id","Beach Name","Measurement timestamp","Water temperature",
    "Turbidity","Transducer depth","Wave height","Wave Period","Battery life",
    "Measurement timestamp label","Measurement ID"]
	},
	actions: {
		/**
		 * Add a new row.
		 *
		 * @actions
		 * @param {Object} data - Data entity
		 *
		 * @returns {Object} Created entity
		 */
		postData:{
			rest: {
				method: "POST",
				path: "/Data",
			},
			params: {
				data: { type: "object" }
			},
			async handler(ctx){
                
                let entity = ctx.params.data;	
				const doc = await this.adapter.insert(entity);
				return doc;
			}
		},

		getData:{
			rest:{
				method: "GET",
				path: "/Data"
			},
			async handler(ctx){

                
                //return result;
			}
		},	
	}
};