array;

show_products();
function show_products() {
  let container = document.querySelector(".product-content");
  for (let i = 0; i < array.length; i++) {
    // console.log(array[i]);
    let div = document.createElement("div");
    div.className = "div_product";

    let img = document.createElement("img");
    img.src = "image/tiger.jpg";
    let p_name = document.createElement("p");
    p_name.innerHTML = `name: ${array[i].name}`;

    let p_price = document.createElement("p");
    p_price.innerHTML = `price: ${array[i].price} `;

    div.appendChild(img);
    div.appendChild(p_name);
    div.appendChild(p_price);
    container.appendChild(div);
  }
}

// script login
