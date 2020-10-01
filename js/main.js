d3.select("div").append("h2").text("Dynamic Content");

var sandwiches = [
    { name: "Thesis", price: 7.95, size: "large" },
    { name: "Dissertation", price: 8.95, size: "large" },
    { name: "Highlander", price: 6.50, size: "small" },
    { name: "Just Tuna", price: 6.50, size: "small" },
    { name: "So-La", price: 7.95, size: "large" },
    { name: "Special", price: 12.50, size: "small" }
  ];

var svg = d3.select("div").append("svg").attr("width",500).attr("height", 500);

d3.csv("https://raw.githubusercontent.com/jbraunschweiger/CSE457-Studio3/master/data/sandwiches.csv?token=AF7MUKUYZPQESBI4QTNOCGS7P5F62").then(data => {
    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cy", 250)
    .attr("cx", function(d, index){
        return (index*75+50);
    })
    .attr("r", function(d) {
        if(d.size === "large") {
            return 20;
        } else {
            return 10;
        }
    })
    .attr("fill", function(d) {
        if(d.price >= 7.0) {
            return "green";
        } else {
            return "gold";
        }
    })
    .attr("stroke", "brown")
    .attr("stroke-width", "2");
}).catch(error =>{
    console.error("Error loading data.");
});

d3.csv("https://raw.githubusercontent.com/jbraunschweiger/CSE457-Studio3/master/data/cities.csv?token=AF7MUKWPCPQB4MYZ47E7POK7P5GNM").then(data => {
    var filteredData = data.filter(function(d){
        return d.eu === "true";
    });
    d3.select("div").append("h2").text(filteredData.length + " Cities");
    var citySVG = d3.select("div").append("svg").attr("width",700).attr("height", 550);

    citySVG.selectAll("cirle")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("cx", function(d){
            return d.x;
        })
        .attr("cy", function(d){
            return d.y;
        })
        .attr("r", function(d) {
            if(d.population < 1000000) {
                return 4;
            } else {
                return 8;
            }
        })
        .attr("class", "city-dot");

    citySVG.selectAll("text")
        .data(filteredData)
        .enter()
        .append("text")
        .attr("x", function(d){
            return d.x;
        })
        .attr("y", function(d){
            return d.y - 12;
        })
        .text(function(d) {
            return d.city;
        })
        .attr("opacity", function(d){
            if(d.population < 1000000) {
                return 0;
            } else {
                return 1;
            }
        })
        .attr("class", "city-label");
});
