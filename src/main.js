console.log(products)
// generating the table
function renderTable() {
    var markup = `<table>`
    markup += `<tr>
            <th>Id</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Os</th>
            <th>Remove</th>
        </tr>
        `
    for (let index = 0; index < products.length; index++) {
        markup += `<tr>
        <td>${products[index].id}</td>
        <td>${products[index].name}</td>
        <td>${products[index].brand}</td>
        <td>${products[index].os}</td>
        <td style="text-align:center;" data="${products[index].id}"><a href="#">X</a></td>
        </tr>
        `
    }
    markup += `</table > `
    // console.log(markup)
    $("#table").append(markup)
}
renderTable()
// search utility by id
function searchById(query) {
    for (let index = 1; index <= $('tr').length; index++) {
        console.log($(`tr:eq(${index}) td:eq(0)`).text())
        var ids = $(`tr:eq(${index}) td:eq(0)`).text()
        if (ids.search(query) >= 0) {
            console.log($(`tr:eq(${index})`).text())
        }
        else{
            $(`tr:eq(${index})`).toggle()
        }

    }
}
//binding events
$("#search_btn").click(function () {
    // console.log($('#search_input').val())
    var query = $('#search_input').val()
    if (query == ''){
        console.log("clearing the filter")
    }
    else if (!isNaN(parseInt(query))) {
        console.log("searching by id")
    }
    else {
        console.log("searching by name")
    }
})