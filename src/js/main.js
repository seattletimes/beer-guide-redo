require("./lib/social");
require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var dot = require("./lib/dot");
var card = dot.compile(require("./_card.html"));

var beerBox = document.querySelector(".beer-box");

var groupedAbvs = {};
abvData.forEach(function(a) {
  if(!groupedAbvs[a.short]) groupedAbvs[a.short] = [];
  groupedAbvs[a.short].push(a);
});

for (var abv in groupedAbvs) {
  beerData.forEach(function(beer) {
    if (abv == beer.short) {
      beer.abvs = groupedAbvs[abv];
    }
  });
}

Array.prototype.forEach.call(document.querySelectorAll('.dot-container'), function(dot) { 
  dot.addEventListener("click", function(e) {
    var beer = beerData.filter(function(row) {
      return row.short == e.target.getAttribute("data-type");
    }).pop();
    beerBox.classList.add("visible");''
    beerBox.innerHTML = card(beer);
    if (document.querySelector(".selected")) {document.querySelector(".selected").classList.remove("selected");}
    e.target.classList.add("selected");
  });
});

document.querySelector(".container").addEventListener("click", function(e) {
  if (e.target.classList.contains("close")) {
    beerBox.classList.remove("visible");
    document.querySelector(".selected").classList.remove("selected");
  }
});
