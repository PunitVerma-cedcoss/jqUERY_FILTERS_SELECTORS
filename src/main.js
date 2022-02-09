const deletedItems = []
console.log(products)
//adding input markup to the DOM
$(".filters").append(`<input type="text" name="" id="search_input" class="grow" />`)
$(".filters").append(`<button id="search_btn">Search</button>`)
$(".filters").after(`<span id="table"></span>`)
$(".filters").after(`<span id="log"></span>`)
// generating the table
function renderTable() {
    var brands = []
    var os = []
    for (let index = 0; index < products.length; index++) {
        brands.push(products[index].brand)
        os.push(products[index].os)
    }
    // removing duplicates elements
    brands = Array.from(new Set(brands))
    os = Array.from(new Set(os))
    // generating the filters dropdown
    var brandMarkup = `
    <select name="" id="brands">
    <option value="none">Select Brands</option>
    `
    for (let index = 0; index < brands.length; index++) {
        brandMarkup += `<option value="${brands[index]}">${brands[index]}</option>`
    }
    brandMarkup += `
        </select>
    `
    $('.filters').append(brandMarkup)

    var osMarkup = `
    <select name="" id="os">
    <option value="none">Select OS</option> 
    `
    for (let index = 0; index < os.length; index++) {
        osMarkup += `<option value="${os[index]}">${os[index]}</option>`
    }
    osMarkup += `
    </select>
    `
    $('.filters').append(osMarkup)
    // aliginnig the filter tab to the table
    var markup = `<table>`
    markup += `
    <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Os</th>
            <th>Remove</th>
        </tr>
    </thead>
    <tbody>
        `
    for (let index = 0; index < products.length; index++) {
        markup += `<tr>
        <td>${products[index].id}</td>
        <td>${products[index].name}</td>
        <td>${products[index].brand}</td>
        <td>${products[index].os}</td>
        <td style="text-align:center;"><a href="#" data="${products[index].id}" id="hide">X</a></td>
        </tr>
        `
    }
    markup += `
    </tbody>
    </table > `
    // console.log(markup)
    $("#table").append(markup)
    $(".filters").css("width", `${$('table').width()}px`)

}
renderTable()
// search utility by id
function searchById(query) {
    let ctr = 0
    for (let index = 1; index <= $('tr').length; index++) {
        console.log($(`tr:eq(${index}) td:eq(0)`).text())
        var ids = $(`tr:eq(${index}) td:eq(0)`).text()
        if (!deletedItems.includes(ids)) {
            if (ids.search(query) >= 0) {
                console.log($(`tr:eq(${index})`).text())
                ctr++
            }
            else {
                $(`tr:eq(${index})`).css('display', 'none')
            }
        }
        else {
            $(`tr:eq(${index})`).css('display', 'none')
        }


    }
    console.log("ctr is " + ctr)
}
// search utility by Name
function searchByName(query) {
    let ctr = 0
    for (let index = 1; index <= $('tr').length; index++) {
        console.log($(`tr:eq(${index}) td:eq(1)`).text())
        var name = $(`tr:eq(${index}) td:eq(1)`).text().toLowerCase()
        if (name.search(query.toLowerCase()) >= 0) {
            console.log($(`tr:eq(${index})`).text())
            ctr++
        }
        else {
            $(`tr:eq(${index})`).css('display', 'none')
        }

    }
}
function clearFilter() {
    console.log("CLEARING OUT")
    $("#log").text("")
    for (let index = 0; index <= $('tr').length; index++) {
        if (!deletedItems.includes($(`tr:eq(${index}) td:eq(0)`).text())) {
            $(`tr:eq(${index})`).css('display', '')
        }
    }
}
function filterByBrands(query) {
    let ctr = 0
    for (let index = 1; index <= $('tr').length; index++) {
        console.log($(`tr:eq(${index}) td:eq(2)`).text())
        var name = $(`tr:eq(${index}) td:eq(2)`).text().toLowerCase()
        if (name.search(query.toLowerCase()) >= 0) {
            console.log($(`tr:eq(${index})`).text())
            ctr++
        }
        else {
            $(`tr:eq(${index})`).css('display', 'none')
        }

    }
}

function filterByOs(query) {
    let ctr = 0
    for (let index = 1; index <= $('tr').length; index++) {
        console.log($(`tr:eq(${index}) td:eq(3)`).text())
        var name = $(`tr:eq(${index}) td:eq(3)`).text().toLowerCase()
        if (name.search(query.toLowerCase()) >= 0) {
            console.log($(`tr:eq(${index})`).text())
            ctr++
        }
        else {
            $(`tr:eq(${index})`).css('display', 'none')
        }

    }
}

//binding events
$("#search_btn").click(function () {
    clearFilter()
    // console.log($('#search_input').val())
    var query = $('#search_input').val()
    if (query == '') {
        console.log("clearing the filter")
    }
    else if (!isNaN(parseInt(query))) {
        console.log("searching by id")
        $("#search_input").attr("placeholder", "Search by Id")
        searchById(query)
    }
    else {
        console.log("searching by name")
        $("#search_input").attr("placeholder", "Search by Name")
        searchByName(query)
    }
    $("#search_input")
})

$("#brands").on('change', function () {
    var x = $(this).val()
    if (x != 'none') {
        clearFilter()
        filterByBrands(x)
    }
    else {
        clearFilter()
    }
})

$("#os").on('change', function () {
    var x = $(this).val()
    if (x != 'none') {
        clearFilter()
        filterByOs(x)
    }
    else {
        clearFilter()
    }
})

$("body").on("click", "#hide", function () {
    // $(this).css("display", "none")
    var query = $(this).attr("data")
    for (let index = 1; index <= $('tr').length; index++) {
        var name = $(`tr:eq(${index}) td:eq(0)`).text().toLowerCase()
        if (name.search(query.toLowerCase()) >= 0) {
            console.log($(`tr:eq(${index})`).text())
            $(`tr:eq(${index})`).css('display', 'none')
            alert($(`tr:eq(${index}) td:eq(0)`).text())
            deletedItems.push($(`tr:eq(${index}) td:eq(0)`).text())
        }

    }
})