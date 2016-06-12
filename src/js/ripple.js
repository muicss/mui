/**
 * MUI CSS/JS ripple module
 * @module ripple
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    waves = require('./lib/waves'),
    btnFABClass = 'mui-btn--fab',
    mui2wavesAddTuples = [
        ['mui-btn--fab',['waves-circle','waves-float']],
        ['mui-btn--raised',['waves-float']],
        ['mui-btn--primary',['waves-light']],
        ['mui-btn--danger',['waves-light']],
        ['mui-btn--dark',['waves-light']],
        ['mui-btn--accent',['waves-light']]
    ],
    mui2wavesSubtractTuples = [
        ['mui-btn--flat',['waves-light']]
    ],
    btnClass = 'mui-btn';

function getWavesEffects(el){
    var effects = [];

    mui2wavesAddTuples.forEach(function(tuple){
        var muiClass = tuple[0],
            wavesEffects = tuple[1];

        if (jqLite.hasClass(el, muiClass)){ 
            wavesEffects.forEach(function(wavesEffect){
                effects.push(wavesEffect);
            });
        }
    
    });

    mui2wavesSubtractTuples.forEach(function(tuple){
        var muiClass = tuple[0],
            wavesEffects = tuple[1];

        if (jqLite.hasClass(el, muiClass)){ 
            wavesEffects.forEach(function(wavesEffect){
                var effectIndex = effects.indexOf(wavesEffect);
                if(effectIndex > -1){
                    effects.splice(effectIndex,1);
                }
            });
        }
    
    });

    return effects;
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var elList = doc.getElementsByClassName(btnClass);
    for (var i=elList.length - 1; i >= 0; i--) {
        var el = elList[i];
		waves.attach(el,getWavesEffects(el));
	} 
    waves.init();

    // listen for new elements
    util.onNodeInserted(function(el) {
      if (jqLite.hasClass(el, btnClass)){
		  waves.attach(el,getWavesEffects(el));
		  waves.init();
      }
    });
  }
};
