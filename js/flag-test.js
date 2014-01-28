$(function(){
    var countryIndex = 0,
    countries,
    countryCodes;
    $.getJSON("iso-3166-1.json", function(data){
        countries = data.Results;
        countryCodes = Object.keys(countries); // get the country codes
        countryCodes.sort(function() { return 0.5 - Math.random() }); // shuffle
        showFlag(getCountryCodeFromHash() || getCountryCodeFromIndex(countryIndex)); // show new flag test (either from hash or using index)
    });

    function showFlag(countryCode){
        // Create flag
        var flag = $("<img/>", {
            "src": "svg/country-4x3/" + countryCode.toLowerCase() + ".svg"
        })
        .on("click", function(){
            toggleInfo(); // show answer
        })
        .on("dblclick", function(){
            showFlag(getCountryCodeFromIndex(++countryIndex)); // show new flag test
        });

        // Add to DOM
        $("body")
        .html("<div><h1>" + 
            countries[countryCode].Name + "</h1> " + 
            ((countries[countryCode].Capital) ? countries[countryCode].Capital.Name : "No Capital") + "</div>")
        .append(flag);

        // After img added to DOM add the touch gesture support
        var element = document.getElementsByTagName('img')[0];
        var hammertime = Hammer(element)
        .on("swipedown swipeup", function() {
            toggleInfo(); // show answer
        })
        .on("doubletap", function() {
            showFlag(getCountryCodeFromIndex(++countryIndex)); // show new flag test
        })
        .on("swipeleft", function(event){
            // We're swiping to the left, so emulate a right keyboard button
            event.which = 39;
            captureKeyboardShortcut(event)
        })
        .on("swiperight", function(event){
            // We're swiping to the right, so emulate a left keyboard button
            event.which = 37;
            captureKeyboardShortcut(event)
        });
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

    // change flag using location.hash
    var captureHashChange = function(event){
        var countryCode = getCountryCodeFromHash();
        // If we have a valid country code, show the flag
        if(countryCode){
            showFlag(countryCode);
        }
        return false;
    };

    // navigate with keyboard
    var captureKeyboardShortcut = function(event){
        // left/right, show new flag
        if(event.which == 37/*left*/ || event.which == 39/*right*/) {
            // set next index based on event
            countryIndex = (event.which == 37) ? --countryIndex : ++countryIndex;
            // reset if out of bounds
            if(countryIndex < 0 || countryIndex > countryCodes.length){
                countryIndex = 0;
            }
            // show the flag
            showFlag(getCountryCodeFromIndex(countryIndex));
        }
        // up/down, toggle answer
        if(event.which == 38/*up*/ || event.which == 40/*down*/) {
            toggleInfo();
        }
    };

    if (window.addEventListener) {
        window.addEventListener("hashchange", captureHashChange, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onhashchange", captureHashChange);
    }

    if (window.addEventListener) {
        window.addEventListener("keydown", captureKeyboardShortcut, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onkeydown", captureKeyboardShortcut);
    }
});