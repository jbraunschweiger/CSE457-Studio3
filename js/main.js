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

