var $form,
    debt,
    URL = "http://allorigins.me/get?url=https%3A//www.treasurydirect.gov/NP_WS/debt/current.JSON";
$.getJSON(URL) //get data
    .done((data) => debt = JSON.parse(data.contents).totalDebt) //set debt to data
    .done(() => $("input[type=submit]").prop("disabled", false)); //enable Calculate! button

// remove matches from string
String.prototype.remove = function(regex) {
    return this.replace(regex, "");
}

// on form submit, update output and return control to item field
function submitForm() {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2
    });
    let price = $form.price.value,
        item = price ? $form.item.value + "s" : "",
        unit = price ? formatter.format(debt/price).remove(/\..+$/) : "$" + formatter.format(debt);

    $form.debtIs.innerText = unit + " " + item; //21630680000000
    $("label[for=debtIs]").css("display", "block");
    $form.item.select();
}

// on load, give control to item field
$(function() {
    $form = $("form")[0];
    $form.item.select();
});