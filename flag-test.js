$(function(){
    var countryIndex = 0,
    countries,
    countryCodes;
    $.getJSON("iso-3166-1.json", function(data){
        countries = data.Results;
        countryCodes = Object.keys(countries); // get the country codes
        countryCodes.sort(function() { return 0.5 - Math.random() }); // shuffle
        showFlag(getCountryCodeFromHash() || countryIndex); // show new flag test (either from hash or using index)
    });

    function showFlag(countryCode){
        // If we don't have an index number, try the hash
        if(isNaN(countryCode)){
            countryCode = getCountryCodeFromHash();
            // If we still don't have a countryCode, exit
            if(!countryCode){
                return false;
            }
        } else {
            countryCode = getCountryCodeFromIndex(countryCode);
        }
        
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
            countries[countryCode].Name + ": " + 
            ((countries[countryCode].Capital) ? countries[countryCode].Capital.Name : "No Capital") + "</div><br />")
        .append(flag);  
    }

    // toggle the showing of answer
    function toggleInfo(){
        $("img, div").toggleClass("slide");
    }

    // return a countryCode from the array using an index
    var getCountryCodeFromIndex = function(countryIndex) {
        return countryCodes[countryIndex].toUpperCase(); // pick the next country code from the list (which is shuffled)
    };

    // return the countryCode used in the hash on the URL
    var getCountryCodeFromHash = function() {
        var countryCode = location.hash;
        if (countryCode.length > 0) {
            countryCode = countryCode.slice(1,3).toUpperCase(); // Slice off the hash and substring to 2 chars
            return (countryCodes.indexOf(countryCode) > 0) ? countryCode : false; // If it exists in the list of countryCodes then return it
        }
        return false;
    };

    if (window.addEventListener) {
        window.addEventListener("hashchange", showFlag, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onhashchange", showFlag);
    }
});