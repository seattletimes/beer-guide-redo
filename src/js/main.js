// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var dot = require("./lib/dot");
var card = dot.compile(require("./_card.html"));

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

document.querySelector(".info-box").innerHTML = `
  <div class="text-box">
    <div class="title">What's in your beer?</div>
    <div class="text">
      The three main ingredients are water, malt (Barley grain that has been kiln dried) and hops (a cone-like fruit grown on vines). From the combination of these ingredients and the fermenting yeast used during brewing come the many colors, flavors and aromas of beer.
    </div>
  </div>

  <div class="text-box">
    <div class="title">Beers have style?</div>
    <div class="text">
      The most common beer styles are ales and lagers. When other ingredients are used to enhance the flavor such as wheat, pumpkin, honey, spices, fruit, smoked malt or chile peppers, the beer is known as a specialty beer.
      <div class="spacer"></div>
      The alcohol content of beer is measured in percent by volume (ABV). The low end is around 2 percent rising up to a sky-high 25 percent! Most beers have an ABV of 4 to 6 percent.
    </div>
  </div>

  <div class="text-box">
    <div class="title">Pint glass 101</div>
    <div class="text">
      Pint glasses come in different styles. English pint glasses include Nonic, Imperial and Tulip styles. The Becker is the German's pint. Both English and German pint glasses hold 20 ounces. The American pint (tumbler or conical-shaped) glass is the most common style and holds 16 ounces.
    </div>
  </div>
`;

Array.prototype.forEach.call(document.querySelectorAll('.dot'), function(dot) { 
  dot.addEventListener("click", function(e) {
    var beer = beerData.filter(function(row) {
      return row.short == e.target.getAttribute("data-type");
    }).pop();
    document.querySelector(".info-box").innerHTML = card(beer);
    if (document.querySelector(".selected")) {document.querySelector(".selected").classList.remove("selected");}
    e.target.classList.add("selected");
  });
});