document.addEventListener("DOMContentLoaded", function() {
  var items = document.querySelectorAll(".item");
  var total = document.getElementById("total");

  var sum = 0;

  items.forEach(function(item) {
    var number = item.querySelector(".number");
    var decreaseBtn = item.querySelector(".decrease");

    var count = 0;

    item.addEventListener("click", function() {
      item.style.backgroundColor = "green";
      count++;
      number.textContent = count;
      setTimeout(function() {
        item.style.backgroundColor = "white";
      }, 100);

      calculateTotal();
    });

    decreaseBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      if (count > 0) {
        count--;
        number.textContent = count;
        calculateTotal();
      }
    });

    function calculateTotal() {
      sum = 0;
      items.forEach(function(item) {
        var count = parseInt(item.querySelector(".number").textContent);
        sum += count;
      });
      total.querySelector(".number").textContent = sum;
    }
  });
});