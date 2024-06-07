document.addEventListener('DOMContentLoaded', function() {
    // selects
    const stateSelect = document.getElementById('state-select');
    const regionSelect = document.getElementById('region-select');
    const settlementSelect = document.getElementById('settlement-select');
    const streetSelect = document.getElementById('street-select');
    const jkSelect = document.getElementById('jk-select');

    function clearSelectOptions(select) {
        // Keep the first option and remove the rest
        while (select.options.length > 1) {
        select.remove(1);
        }
    }

    function clickAllClearButtons() {
        const clearButtons = document.querySelectorAll('.filter-clear-hidden .filter-clear-btn');

        clearButtons.forEach(button => button.click());
    }

    function removeRedirectedChecked() {
        // Select all the div elements inside the radio labels
        var radioInputDivs = document.querySelectorAll('.filters-radio .w-form-formradioinput');

        // Iterate over each div and remove the 'w--redirected-checked' class if it exists
        radioInputDivs.forEach(function(div) {
        if (div.classList.contains('w--redirected-checked')) {
                div.classList.remove('w--redirected-checked');
        }
        });
    }
        
    function sortLocationSelect() {
        const locationSelect = document.getElementById('state-select');
        const specialOptions = ["м. Київ", "Київська область"];

        // Extract and remove the special options
        let specialOptionsElements = [];
        let otherOptions = [];
        let seenSpecial = new Set();
        let seenOther = new Set();

        Array.from(locationSelect.options).forEach(option => {
        if (option.value != ""){
            if (specialOptions.includes(option.value)) {
                    if (!seenSpecial.has(option.value)) {
                    seenSpecial.add(option.value);
                    specialOptionsElements.push(option);
                    }
            } else {
                    if (!seenOther.has(option.value)) {
                    seenOther.add(option.value);
                    otherOptions.push(option);
                    }
            }
        }
        });

        // Sort the remaining options alphabetically by text
        otherOptions.sort((a, b) => a.text.localeCompare(b.text));

        // Clear the existing options
        locationSelect.innerHTML = '<option value="">Область</option>';

        // Append the special options first
        specialOptionsElements.forEach(option => locationSelect.appendChild(option));

        // Append the sorted options
        otherOptions.forEach(option => locationSelect.appendChild(option));
    }
    
    function parseCatalogStreets() {
        const streetsWrapper = document.querySelector('.catalog-hidden-street');
        const items = streetsWrapper.querySelectorAll('.catalog-hidden-item');
        let catalogData = {};

        items.forEach(item => {
        const state = item.querySelector('.fl-state').textContent.trim();
        const region = item.querySelector('.fl-region').textContent.trim();
        const settlement = item.querySelector('.fl-settlement').textContent.trim();
        const street = item.querySelector('.fl-street-jk').textContent.trim();

        if (!catalogData[state]) {
                catalogData[state] = {};
        }
        if (!catalogData[state][region]) {
                catalogData[state][region] = {};
        }
        if (!catalogData[state][region][settlement]) {
                catalogData[state][region][settlement] = {};
        }
        if (!catalogData[state][region][settlement][street]) {
                catalogData[state][region][settlement][street] = {};
        }
        //catalogData[state][region][settlement].push(street);
        });

        return catalogData;
    }

    function parseCatalogJKs() {
        const JKsWrapper = document.querySelector('.catalog-hidden-jk');
        const items = JKsWrapper.querySelectorAll('.catalog-hidden-item');
        let catalogData = {};

        items.forEach(item => {
        const state = item.querySelector('.fl-state').textContent.trim();
        const region = item.querySelector('.fl-region').textContent.trim();
        const settlement = item.querySelector('.fl-settlement').textContent.trim();
        const jk = item.querySelector('.fl-street-jk').textContent.trim();

        if (!catalogData[state]) {
                catalogData[state] = {};
        }
        if (!catalogData[state][region]) {
                catalogData[state][region] = {};
        }
        if (!catalogData[state][region][settlement]) {
                catalogData[state][region][settlement] = {};
        }
        if (!catalogData[state][region][settlement][jk]) {
                catalogData[state][region][settlement][jk] = {};
        }
        //catalogData[state][region][settlement].push(street);
        });

        return catalogData;
    }
    
    function parseCatalogLand() {
        const landWrapper = document.querySelector('.catalog-hidden-land');
        if (!landWrapper) {
        return {};
        }

        const items = landWrapper.querySelectorAll('.catalog-hidden-item');
        let catalogData = {};
        
        items.forEach(item => {
        const state = item.querySelector('.fl-state').textContent.trim();
        const region = item.querySelector('.fl-region').textContent.trim();
        const settlement = item.querySelector('.fl-settlement').textContent.trim();

        if (!catalogData[state]) {
            if (state != ""){
                catalogData[state] = {};
            }
            else {
                return catalogData;
            } 
        }
        if (!catalogData[state][region]) {
                catalogData[state][region] = {};
        }
        if (!catalogData[state][region][settlement]) {
                catalogData[state][region][settlement] = {};
        }
        });

        return catalogData;
    }

    function parseCatalogAll() {
        const allWrapper = document.querySelector('.catalog-hidden-all');
        if (!allWrapper) {
        return {};
        }

        const items = allWrapper.querySelectorAll('.catalog-hidden-item');
        let catalogData = {};
        
        items.forEach(item => {
        const state = item.querySelector('.fl-state').textContent.trim();
        const region = item.querySelector('.fl-region').textContent.trim();
        const settlement = item.querySelector('.fl-settlement').textContent.trim();

        if (!catalogData[state]) {
            if (state != ""){
                catalogData[state] = {};
            }
            else {
                return catalogData;
            } 
        }
        if (!catalogData[state][region]) {
                catalogData[state][region] = {};
        }
        if (!catalogData[state][region][settlement]) {
                catalogData[state][region][settlement] = {};
        }
        });

        return catalogData;
    }

    const jsonDataStreets = parseCatalogStreets();
    const jsonDataJKs = parseCatalogJKs();
    const jsonDataLand = parseCatalogLand();
    const jsonDataAll = parseCatalogAll();

    stateSelect.innerHTML = '<option value="">Область</option>';
    regionSelect.disabled = true;
    settlementSelect.disabled = true;
    streetSelect.disabled = true;
    jkSelect.disabled = true;

    function updateSelects() {
        clearSelectOptions(stateSelect);
        clearSelectOptions(regionSelect);
        clearSelectOptions(settlementSelect);
        clearSelectOptions(streetSelect);
        clearSelectOptions(jkSelect);
        stateSelect.classList.remove('fs-cmsfilter_active');
        regionSelect.classList.remove('fs-cmsfilter_active');
        settlementSelect.classList.remove('fs-cmsfilter_active');
        streetSelect.classList.remove('fs-cmsfilter_active');
        jkSelect.classList.remove('fs-cmsfilter_active');

        stateSelect.innerHTML = '<option value="">Область</option>';
        regionSelect.disabled = true;
        settlementSelect.disabled = true;
        streetSelect.disabled = true;
        jkSelect.disabled = true;

        var selectedRadio = document.querySelector('input[type="radio"][data-name="Types"]:checked');

        if (!selectedRadio) {
        var selectedValue = "else";
        }
        else {  
        var selectedValue = selectedRadio.value.toLowerCase();
        }
        
        if (selectedValue == "commercial" || selectedValue == "house") {
        // Populate state select
        Object.keys(jsonDataStreets).forEach(state => {
                const option = new Option(state, state);
                stateSelect.appendChild(option);
        });

        // Handle state select changes
        stateSelect.addEventListener('change', () => {
                regionSelect.innerHTML = '<option value="">Район</option>';
                regionSelect.disabled = true; // Disable region select until a state is chosen
                settlementSelect.disabled = true;
                streetSelect.disabled = true;
            

                if (stateSelect.value) {
                    const regions = jsonDataStreets[stateSelect.value];
                    Object.keys(regions).forEach(region => {
                    const option = new Option(region, region);
                    regionSelect.appendChild(option);
                    });
                    regionSelect.disabled = false; // Enable region select
                }

                regionSelect.addEventListener('change', () => {
                    settlementSelect.innerHTML = '<option value="">Місто/населений пункт</option>';
                    settlementSelect.disabled = true;
                    streetSelect.disabled = true;

                    if (regionSelect.value) {
                    const settlements = jsonDataStreets[stateSelect.value][regionSelect.value];
                    Object.keys(settlements).forEach(settlement => {
                            const option = new Option(settlement, settlement);
                            settlementSelect.appendChild(option);
                    });
                    settlementSelect.disabled = false;
                    }

                    settlementSelect.addEventListener('change', () => {
                    streetSelect.innerHTML = '<option value="">Вулиця</option>';
                    streetSelect.disabled = true;

                    if (settlementSelect.value) {
                            const streets = jsonDataStreets[stateSelect.value][regionSelect.value][settlementSelect.value];
                            Object.keys(streets).forEach(street => {
                                const option = new Option(street, street);
                                streetSelect.appendChild(option);
                            });
                            streetSelect.disabled = false;
                    }
                    });
                });
        });
        } else if (selectedValue == "flat") {
        // Populate state select
        Object.keys(jsonDataJKs).forEach(state => {
                const option = new Option(state, state);
                stateSelect.appendChild(option);
        });

        // Handle state select changes
        stateSelect.addEventListener('change', () => {
                regionSelect.innerHTML = '<option value="">Район</option>';
                regionSelect.disabled = true; // Disable region select until a state is chosen
                settlementSelect.disabled = true;
                jkSelect.disabled = true;

                if (stateSelect.value) {
                    const regions = jsonDataJKs[stateSelect.value];
                    Object.keys(regions).forEach(region => {
                    const option = new Option(region, region);
                    regionSelect.appendChild(option);
                    });
                    regionSelect.disabled = false; // Enable region select
                }

                regionSelect.addEventListener('change', () => {
                    settlementSelect.innerHTML = '<option value="">Місто/населений пункт</option>';
                    settlementSelect.disabled = true;
                    jkSelect.disabled = true;

                    if (regionSelect.value) {
                    const settlements = jsonDataJKs[stateSelect.value][regionSelect.value];
                    Object.keys(settlements).forEach(settlement => {
                            const option = new Option(settlement, settlement);
                            settlementSelect.appendChild(option);
                    });
                    settlementSelect.disabled = false;
                    }

                    settlementSelect.addEventListener('change', () => {
                    jkSelect.innerHTML = '<option value="">ЖК</option>';
                    jkSelect.disabled = true;

                    if (settlementSelect.value) {
                            const jks = jsonDataJKs[stateSelect.value][regionSelect.value][settlementSelect.value];
                            Object.keys(jks).forEach(jk => {
                                const option = new Option(jk, jk);
                                jkSelect.appendChild(option);
                            });
                            jkSelect.disabled = false;
                    }
                    });
                });
        });
        } else if (selectedValue == "land") { 
        // Populate state select
        Object.keys(jsonDataLand).forEach(state => {
                const option = new Option(state, state);
                stateSelect.appendChild(option);
        });

        // Handle state select changes
        stateSelect.addEventListener('change', () => {
                regionSelect.innerHTML = '<option value="">Район</option>';
                regionSelect.disabled = true; // Disable region select until a state is chosen
                settlementSelect.disabled = true;

                if (!(stateSelect.value in jsonDataLand) && stateSelect.value != "") {
                    jsonDataLand[stateSelect.value] = {};
                }

                if (stateSelect.value) {
                    const regions = jsonDataLand[stateSelect.value];
                    Object.keys(regions).forEach(region => {
                    const option = new Option(region, region);
                    regionSelect.appendChild(option);
                    });
                    regionSelect.disabled = false; // Enable region select
                }

                regionSelect.addEventListener('change', () => {
                    settlementSelect.innerHTML = '<option value="">Місто/населений пункт</option>';
                    settlementSelect.disabled = true;

                    if (regionSelect.value) {
                    const settlements = jsonDataLand[stateSelect.value][regionSelect.value];
                    Object.keys(settlements).forEach(settlement => {
                            const option = new Option(settlement, settlement);
                            settlementSelect.appendChild(option);
                    });
                    settlementSelect.disabled = false;
                    }
                });
        });
        } else {
        // Populate state select
        Object.keys(jsonDataAll).forEach(state => {
                const option = new Option(state, state);
                stateSelect.appendChild(option);
        });

        // Handle state select changes
        stateSelect.addEventListener('change', () => {
                regionSelect.innerHTML = '<option value="">Район</option>';
                regionSelect.disabled = true; // Disable region select until a state is chosen
                settlementSelect.disabled = true;

                if (!(stateSelect.value in jsonDataAll) && stateSelect.value != "") {
                    jsonDataAll[stateSelect.value] = {};
                }

                if (stateSelect.value) {
                    const regions = jsonDataAll[stateSelect.value];
                    Object.keys(regions).forEach(region => {
                    const option = new Option(region, region);
                    regionSelect.appendChild(option);
                    });
                    regionSelect.disabled = false; // Enable region select
                }

                regionSelect.addEventListener('change', () => {
                    settlementSelect.innerHTML = '<option value="">Місто/населений пункт</option>';
                    settlementSelect.disabled = true;

                    if (regionSelect.value) {
                    const settlements = jsonDataAll[stateSelect.value][regionSelect.value];
                    Object.keys(settlements).forEach(settlement => {
                            const option = new Option(settlement, settlement);
                            settlementSelect.appendChild(option);
                    });
                    settlementSelect.disabled = false;
                    }
                });
        });
        }
        sortLocationSelect();
    }

    document.querySelectorAll('input[type="radio"][name="Types"]').forEach(radio => {
        radio.addEventListener('change', function() {
        if (this.checked) {
            clickAllClearButtons();
            updateSelects();
        }
        });
    });

    // all other
    var radioButtons = document.querySelectorAll('input[type="radio"][data-name="Types"]');
    var filterSections = document.querySelectorAll('.filters-house, .filters-commercial, .filters-flat, .filters-land');
    var heroCatalog = document.querySelector('.hero-catalog');
    var clearLink = document.querySelector('a[fs-cmsfilter-element="clear"]');
    var flStreet = document.getElementById('fl-street');
    var flJk = document.getElementById('fl-jk');
    var filtersSquareMeters = document.querySelector('.filters-square-meters');
    var filtersSquareAcres = document.querySelector('.filters-square-acres');
    var filtersPrice = document.querySelector('.filters-price');

    // Mapping from query params to radio button values
    var objectMapping = {
        "Будинок": "House",
        "Комерція": "Commercial",
        "Квартира": "Flat",
        "Земля": "Land"
    };

    function clearFilters() {

        //document.querySelectorAll('select').forEach(select => select.value = '');
        clearSelectOptions(stateSelect);
        clearSelectOptions(regionSelect);
        clearSelectOptions(settlementSelect);
        clearSelectOptions(streetSelect);
        clearSelectOptions(jkSelect);
        // Set "Область" as the selected element
        stateSelect.selectedIndex = 0;
        //stateSelect.classList.remove('fs-cmsfilter_active');
        regionSelect.classList.remove('fs-cmsfilter_active');
        settlementSelect.classList.remove('fs-cmsfilter_active');
        streetSelect.classList.remove('fs-cmsfilter_active');
        jkSelect.classList.remove('fs-cmsfilter_active');
        removeRedirectedChecked();

        document.querySelectorAll('input[type=text]').forEach(input => input.value = '');
        radioButtons.forEach(radio => {
        radio.checked = false;
        var parentLabel = radio.closest('.w-radio');
        if (parentLabel && parentLabel.classList.contains('fs-cmsfilter_active')) {
                parentLabel.classList.remove('fs-cmsfilter_active');
        }
        });
        updateSelects();
    }

    function hideAllFilters() {
        filterSections.forEach(section => section.style.display = 'none');
        flJk.style.display = 'none';
        flStreet.style.display = 'none';
        filtersSquareMeters.style.display = 'block';
        filtersSquareAcres.style.display = 'none';
    }

    function updateBackgroundImage(value) {
        var images = {
        default: "https://assets-global.website-files.com/6620d5e5b99ee03c5496d49e/663ca608423abfe721f9a07e_Default.webp",
        flat: "https://assets-global.website-files.com/6620d5e5b99ee03c5496d49e/663ca608f92d1a423c042655_Flat.webp",
        commercial: "https://assets-global.website-files.com/6620d5e5b99ee03c5496d49e/663ca608fe5c1939b0b62b7f_Commercial.webp",
        house: "https://assets-global.website-files.com/6620d5e5b99ee03c5496d49e/663ca60821d5068fcc8922f3_House.webp",
        land: "https://assets-global.website-files.com/6620d5e5b99ee03c5496d49e/663ca608e43eb3ad4fa12b87_Land.webp"
        };
        heroCatalog.style.backgroundImage = 'url(' + images[value] + ')';
    }

    function resetSelectInputs() {
        document.querySelectorAll('.filter-select').forEach(select => {
        select.selectedIndex = 0; // Reset to the first option, assuming the first option is a placeholder or default
        });
    }

    function handleRadioButtonChange() {
        resetSelectInputs();
        hideAllFilters();
        var selectedRadio = document.querySelector('input[type="radio"][data-name="Types"]:checked');
        if (!selectedRadio) return;

        var selectedValue = selectedRadio.value.toLowerCase();
        updateBackgroundImage(selectedValue);
        document.querySelector('.' + 'filters-' + selectedValue).style.display = 'block';

        switch (selectedValue) {
        case 'flat':
                flJk.style.display = 'block';
                filtersSquareMeters.style.display = 'block';
                filtersPrice.style.display = 'block';
                filtersSquareAcres.style.display = 'none';
                break;
        case 'land':
                filtersSquareAcres.style.display = 'block';
                filtersPrice.style.display = 'block';
                filtersSquareMeters.style.display = 'none';
                break;
        default:
                flStreet.style.display = 'block';
                filtersSquareMeters.style.display = 'block';
                filtersPrice.style.display = 'block';
                filtersSquareAcres.style.display = 'none';
                break;
        }
    }

    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('click', handleRadioButtonChange);
    });
    
    setTimeout(function() {
        clearLink.addEventListener('click', function(e) {
        e.preventDefault();
        clearFilters();
        hideAllFilters();
        updateBackgroundImage('default'); // Reset to default background on clear
        });
    }, 5000);

    // Initialize the form setup
    hideAllFilters(); // Set the default state
    updateBackgroundImage('default'); // Set the default background image on load

    function getQueryParams() {
        var params = {};
        var queryString = location.search.slice(1);
        if (queryString) {
        queryString.split("&").forEach(function(pair) {
                var [key, value] = pair.split("=");
                if (key) {
                    params[key] = decodeURIComponent(value.replace(/\+/g, ' ')).trim();
                }
        });
        }
        const reverseObjectTranslation = {
        "House": "Будинок",
        "Commercial": "Комерція",
        "Flat": "Квартира",
        "Land": "Земля"
        };
        params["object"] = reverseObjectTranslation[params["object"]];

        const reverseRegionTranslation = {
        "KyivRegion": "Київська область",
        "KyivCity": "м. Київ",
        "VinnytsiaRegion": "Вінницька область",
        "VolynRegion": "Волинська область",
        "DnipropetrovskRegion": "Дніпропетровська область",
        "ZhytomyrRegion": "Житомирська область",
        "ZakarpattiaRegion": "Закарпатська область",
        "ZaporizhzhiaRegion": "Запорізька область",
        "IvanoFrankivskRegion": "Івано-Франківська область",
        "KirovohradRegion": "Кіровоградська область",
        "LvivRegion": "Львівська область",
        "MykolaivRegion": "Миколаївська область",
        "OdesaRegion": "Одеська область",
        "PoltavaRegion": "Полтавська область",
        "RivneRegion": "Рівненська область",
        "SumyRegion": "Сумська область",
        "TernopilRegion": "Тернопільська область",
        "KharkivRegion": "Харківська область",
        "KhersonRegion": "Херсонська область",
        "KhmelnytskyiRegion": "Хмельницька область",
        "CherkasyRegion": "Черкаська область",
        "ChernivtsiRegion": "Чернівецька область",
        "ChernihivRegion": "Чернігівська область"
        };
        params["location"] = reverseRegionTranslation[params["location"]];

        return params;
    }

    function setInputValues(params) {
    var priceFromInput = document.querySelector('input[fs-cmsfilter-field="price"][fs-cmsfilter-range="from"]');
    var priceToInput = document.querySelector('input[fs-cmsfilter-field="price"][fs-cmsfilter-range="to"]');
    var areaFromInput = document.querySelector('input[fs-cmsfilter-field="area"][fs-cmsfilter-range="from"]');
    var areaToInput = document.querySelector('input[fs-cmsfilter-field="area"][fs-cmsfilter-range="to"]');
    var plotAreaFromInput = document.querySelector('input[fs-cmsfilter-field="plotarea"][fs-cmsfilter-range="from"]');
    var plotAreaToInput = document.querySelector('input[fs-cmsfilter-field="plotarea"][fs-cmsfilter-range="to"]');

    if (params.pricefrom && priceFromInput) {
        priceFromInput.value = params.pricefrom;
        priceFromInput.classList.add('fs-cmsfilter_active');
    }
    if (params.priceto && priceToInput) {
        priceToInput.value = params.priceto;
        priceToInput.classList.add('fs-cmsfilter_active');
    }
    if (params.areafrom && areaFromInput) {
        areaFromInput.value = params.areafrom;
        areaFromInput.classList.add('fs-cmsfilter_active');
    }
    if (params.areato && areaToInput) {
        areaToInput.value = params.areato;
        areaToInput.classList.add('fs-cmsfilter_active');
    }
    if (params.plotareafrom && plotAreaFromInput) {
        plotAreaFromInput.value = (Number(params.plotareafrom) / 10000).toString();
        plotAreaFromInput.classList.add('fs-cmsfilter_active');
    }
    if (params.plotareato && plotAreaToInput) {
        plotAreaToInput.value = (Number(params.plotareato) / 10000).toString();
        plotAreaToInput.classList.add('fs-cmsfilter_active');
    }
}

    // Get URL parameters
    var queryParams = getQueryParams();

    // Set input values based on URL parameters
    setInputValues(queryParams);

    if (queryParams.object) {
        var objectValue = objectMapping[queryParams.object];
        var targetRadioButton = Array.from(radioButtons).find(radio => radio.value === objectValue);
        if (targetRadioButton) {
        targetRadioButton.click();

        // Find the parent wrapper of the target radio button
        var parentLabel = targetRadioButton.closest('.w-radio');
        if (parentLabel) {
            // Find the div with the class 'w-form-formradioinput' inside the parent wrapper
            var radioInputDiv = parentLabel.querySelector('.w-form-formradioinput');
            if (radioInputDiv) {
                // Add the class 'w--redirected-checked' to the div
                radioInputDiv.classList.add('w--redirected-checked');
            }
        }
        handleRadioButtonChange();
        }
    }

    if (queryParams.location) {

        var selectElement = document.querySelector('select[fs-cmsfilter-field="obl"]');
        var options = Array.from(selectElement.options); // Convert options to an array
        var matched = false;

        options.forEach(function(option, index) {
        if (option.value === queryParams.location) {
            selectElement.selectedIndex = index; // Set the select index directly
            matched = true;
            // Trigger change event
            var event = new Event('change');
            selectElement.dispatchEvent(event);
        }
        });

        if (!matched) {
        const option = new Option(queryParams.location, queryParams.location);
        selectElement.appendChild(option);
        selectElement.value = queryParams.location; // Set the new option as selected
        // Trigger change event
        var event = new Event('change');
        selectElement.dispatchEvent(event);
        }
    }
    if (queryParams.object){
    }
    else{
        clearFilters();
    }

});
