const products = [
    {
        id: 5,
        name: "Smart Watch",
        price: 99.99,
        image: "watch.jpg",
        description: "Feature-packed smartwatch to track your fitness and stay connected.",
        colors: ["#c0c0c0", "#ffd700"]
    },      
    {
        id: 4,
        name: "Laptop Backpack",
        price: 39.99,
        image: "Laptopbag.jpg",
        description: "Spacious backpack with padded compartment for your laptop.",
        colors: ["#000000", "#808080"]
    },
    {
        id: 13,
        name: "Action Camera",
        price: 149.99,
        image: "cam-5.jpg",
        description: "Waterproof action camera for capturing adventures.",
        colors: ["#000000", "#ffffff", "#ff0000"]
        },
    
    {
        id: 6,
        name: "Wireless Headphones",
        price: 69.99,
        image: "arr-headP.png",
        description: "High-quality wireless headphones for music lovers.",
        colors: ["#000000", "#ffffff", "#ff0000"]
    },
    {
        id: 1,
        name: "Classic T-Shirt",
        price: 19.99,
        image: "tshirt.jpg",
        description: "Comfortable cotton t-shirt available in various colors.",
        colors: ["#ff0000", "#00ff00", "#0000ff"]
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        price: 49.99,
        image: "fit-jeans.jpeg",
        description: "Stylish slim fit jeans perfect for any casual occasion.",
        colors: ["#000080", "#8b4513"]
    },
    {
        id: 3,
        name: "Running Sneakers",
        price: 79.99,
        image: "sneakers.jpg",
        description: "Lightweight and comfortable sneakers for your daily run.",
        colors: ["#ffffff", "#000000", "#ff0000"]
    },
    
    {
        id: 7,
        name: "Fitness Tracker",
        price: 29.99,
        image: "fitness.jpg",
        description: "Track your fitness goals with this sleek and stylish tracker.",
        colors: ["#000000", "#808080", "#c0c0c0"]
    },

    {
        id: 8,
        name: "Gaming Console",
        price: 299.99,
        image: "gamingconsole.jpg",
        description: "Experience immersive gaming with this powerful console.",
        colors: ["#000000", "#ffffff", "#008000"]
    },

    {
        id: 9,
        name: "Portable Power Bank",
        price: 19.99,
        image: "powerbank.jpg",
        description: "Charge your devices on-the-go with this compact power bank.",
        colors: ["#000000", "#ffffff", "#ff0000"]
    },

    {
        id: 10,
        name: "Water Bottle",
        price: 9.99,
        image: "bottle.jpg",
        description: "Stay hydrated with this eco-friendly water bottle.",
        colors: ["#000000", "#ffffff", "#008000"]
    },

{
    id: 11,
    name: "Tablet Stand",
    price: 19.99,
    image: "tabstand.jpg",
    description: "Adjustable stand for tablets and smartphones.",
    colors: ["#000000", "#ffffff", "#808080"]
    },
    
    {
    id: 12,
    name: "Virtual Reality Headset",
    price: 199.99,
    image: "VR headset.jpg",
    description: "Immersive VR experience with advanced graphics.",
    colors: ["#000000", "#ffffff", "#008000"]
    },
    {
    id: 15,
    name: "Wireless Router",
    price: 49.99,
    image: "router.jpeg",
    description: "High-speed wireless router for home networking.",
    colors: ["#000000", "#ffffff", "#ff0000"]
    },
    
    {
    id: 16,
    name: "External Hard Drive",
    price: 79.99,
    image: "harddrive.jpg",
    description: "High-capacity external hard drive for data storage.",
    colors: ["#000000", "#ffffff", "#008000"]
    }
];

let cart = [];

function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img id="imghover" src="${product.image}" text=${product.name}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <div class="color-options">
                ${product.colors.map((color, index) => `
                    <div class="color-option ${index === 0 ? 'selected' : ''}" 
                         style="background-color: ${color};"
                         onclick="selectColor(this, ${product.id}, '${color}')"></div>
                `).join('')}
                
            </div>

            <div class="quantity-selector">
                <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
                <span class="quantity" id="quantity-${product.id}">1</span>
                <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
            </div>
            
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
           
        `;
        productGrid.appendChild(productCard);
        
    });
}

function selectColor(element, productId, color) {
    const productCard = element.closest('.product-card');
    productCard.querySelectorAll('.color-option').forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');
    // You can use the selected color when adding the item to the cart
}

function changeQuantity(productId, change) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent) + change;
    if (quantity < 1) quantity = 1;
    quantityElement.textContent = quantity;
}


function addToCart(productId) {  //this function is used to add the product to cart 
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent);
    const selectedColor = document.querySelector(`.product-card:has(#quantity-${productId}) .color-option.selected`).style.backgroundColor;

    const existingItem = cart.find(item => item.id === productId && item.color === selectedColor);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity, color: selectedColor });
    }

    updateCartCount();
    updateCartSidebar();
    showAlert();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity,0);
}//when we click the function it returns the updatecartcount

 function calculateCartTotal() {
            return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        }


function updateCartSidebar() {  //updating the value in cart 
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
            <p>Color: <span style="display: inline-block; width: 20px; height: 20px; background-color: ${item.color}; vertical-align: middle;"></span></p>
            <button onclick="removeFromCart(${item.id}, '${item.color}')">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<h3>Total: $${calculateCartTotal()}</h3>`;
    cartItems.appendChild(totalElement);
}

function removeFromCart(productId, color) {
    cart = cart.filter(item => !(item.id === productId && item.color === color));
    updateCartCount();
    updateCartSidebar();
} // this function is used to remove the product from the cart 

function showAlert() { 
    const alert = document.getElementById('alert');
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 4000);
} 

document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.toggle('open');
});

document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.remove('open');
});


displayProducts();





