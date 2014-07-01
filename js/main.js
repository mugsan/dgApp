/*global, $*/
DGAPP.gui = (function(){
    "use strict";
    var roundsForm = (function() {

    }());

}());


var DGAPP = (function(){
    "use strict";
    var mData, 
        mSave = "save",

        // @return {string} parsed current date i.e: "27/05/2039 14:38"
        getParsedDate = function(){
            var tDate = new Date(),
                tParse = function (arg_number) {
                    return (arg_number < 10)? '0' + arg_number: arg_number;
                };

            return  tParse(tDate.getDate()) + "/" + 
                    tParse(tDate.getMonth()) + "/" + 
                    tParse(tDate.getFullYear()) + " " + 
                    tParse(tDate.getHours()) + ":" +
                    tParse(tDate.getMinutes());
        },
    
        // @param {string} property of mIndex to be saved
        save = function(){
            localStorage.setItem(mSave, JSON.stringify(mData));
            return this;
        },

        // @param {string} key of value to load.
        // @return {object} parsed object
        load = function(){
            mData =  JSON.parse(localStorage.getItem(mSave)) || {};
            return this;
        },

        newRound = function(arg_string){

            var tDate = getParsedDate();

            if(!mData.hasOwnProperty(tDate) && arg_string){
                mData[tDate] = {};
                mData[tDate].id = tDate;
                mData[tDate].default = arg_string;
                mData[tDate][arg_string] = [];
            }
            return this;
        };


    //public methods
    return {
        load: load,
        getData: function(){
            return mData;
        },
        define: newRound,
        save: save
    };
}());

DGAPP.PAR = {
    yellow: [
        3, 3, 3, 3, 3, 3,
        3, 3, 3, 3, 3, 3,
        3, 3, 3, 3, 3, 3
    ],
    red: [
        3, 3, 3, 3, 3, 3,
        3, 3, 4, 3, 3, 4,
        3, 4, 3, 4, 3, 3
    ]
};


$(document).on('pagebeforeshow', '#rounds', function(){
    "use strict";
    $.each( DGAPP.data.getData(), function(key, value) {
        $('<li>').append(value.id).appendTo('#roundsListView');
    });
    $('#roundsListView').listview("refresh");
});
