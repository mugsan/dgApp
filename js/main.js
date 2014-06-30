var Dg_app = {};

Dg_app.data = (function(){
    "use strict";
    var mIndex, 
        mPBest,
        mCurr;

    // @return {string} parsed current date i.e: 27/5-2039
    var getParsedDate = function(){
        var tDate = new Date(),
            tYear = tDate.getFullYear(),
            tMonth = tDate.getMonth(),
            tDay = tDate.getDate();

        return  tDay + "/" + tMonth + "-" + tYear;
    };
    
    // @param {string} property of mIndex to be saved
    var save = function(arg_string){
        localStorage.setItem(arg_string, JSON.stringify(mIndex[arg_string]));
    };

    // @param {string} key of value to load.
    // @return {object} parsed object
    var load = function(arg_string){
        return JSON.parse(localStorage.getItem(arg_string)) || {};
    };

    //public methods
    return {
        init: function(){
            mIndex = load("save");
            mIndex.pb = load("pb");
            return this;
        },
        close: function(){
            save("save");
            save({name: "pb", table: mIndex.pb});
            return this;
        },
        pick: function(arg_string){
            mCurr = load(arg_string);
            return this;
        },

    };
}());
