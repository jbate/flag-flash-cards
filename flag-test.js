$(function(){
    var countryIndex = 0,
    countries,
    countryCodes;
    $.getJSON("iso-3166-1.json", function(data){
        countries = data;
        countryCodes = Object.keys(countries.Results); // get the country codes
        countryCodes.sort(function() { return 0.5 - Math.random() }); // shuffle
        showFlag(countryIndex); // show new flag test
    });
    

    function showFlag(countryIndex){
        var countryCode = countryCodes[countryIndex]; // pick the next country code from the list (which is shuffled)
        // Create flag
        var flag = $("<img/>", {
            "src": "svg/country-4x3/" + countryCode.toLowerCase() + ".svg"
        })
        .on("click", function(){
            toggleInfo(); // show answer
        })
        .on("dblclick", function(){
            showFlag(++countryIndex); // show new flag test
        });

        // Add to DOM
        $("body")
        .html("<div>" + 
            countries.Results[countryCode].Name + ": " + 
            ((countries.Results[countryCode].Capital) ? countries.Results[countryCode].Capital.Name : "No Capital") + "</div><br />")
        .append(flag);  
    }

    // toggle the showing of answer
    function toggleInfo(){
        $("img, div").toggleClass("slide");
    }
});