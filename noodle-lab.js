'use strict';

var recipes = {
    'soba': {
	'name': '80% Soba',
	'flour1': 'Bovete',
	'flour2': 'Spelt',
	'flourRatio': 0.8,
	'wetsRatio': 0.48,
	'saltRatio': 0,
    },
    'udon': {
	'name': 'Saltå Udon',
	'flour1': 'Saltå Kvarn vetemjöl',
	'flour2': '',
	'flourRatio': 1,
	'wetsRatio': 0.47,
	'saltRatio': 0.1,
    }
};

/** Grams of flour per serving */
const servingSize = 70;

/**
 * @param {number} quantity - Total amount of flour [g]
 */
function calc(recipe, quantity) {
    var flour1, flour2, water, salt;

    // dries
    flour1 = quantity*recipe.flourRatio;
    if (recipe.flour2)
	flour2 = quantity*(1-recipe.flourRatio);
    
    // wets
    var wets = quantity*recipe.wetsRatio;
    salt = wets*recipe.saltRatio;
    water = wets-salt;

    return [flour1, flour2, water, salt];
}

function updateView(flour1, flour2, water, salt) {
    document.getElementById('flour1').textContent = Math.round(flour1).toString();
    document.getElementById('flour2').textContent = Math.round(flour2).toString();
    document.getElementById('water').textContent = Math.round(water).toString();
    document.getElementById('salt').textContent = Math.round(salt).toString();

    document.getElementById('total').textContent = Math.round(flour1+flour2+water+salt).toString();
};

var recipe = recipes['soba'];

window.onload = function() {
    document.getElementById('flourRatio').value = 100*recipe.flourRatio;
    document.getElementById('wetsRatio').value = 100*recipe.wetsRatio;
    
    // setup event listeners
    document.getElementById('servings').addEventListener('change', function() {
	updateView.apply(null, calc(recipe, servingSize*this.value));
    });
    document.getElementById('flourRatio').addEventListener('input', function() {
	recipe.flourRatio = this.value/100;
	updateView.apply(null, calc(recipe, servingSize*document.getElementById('servings').value));
    });
    document.getElementById('wetsRatio').addEventListener('input', function() {
	recipe.wetsRatio = this.value/100;
	updateView.apply(null, calc(recipe, servingSize*document.getElementById('servings').value));
    });

    // update initial view
    updateView.apply(null, calc(recipe, servingSize*document.getElementById('servings').value));
};
