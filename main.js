// إخفاء الـ top bar
document.querySelector('.close-top-bar')?.addEventListener('click', function () {
  document.querySelector('.top-bar').style.display = 'none';
});

// menu toggle
const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggleBtn?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// counter
const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;

    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target.toLocaleString() + "+";
    }
  };

  updateCount();
});


// main photo
 const thumbnails = document.querySelectorAll('.thumbnails img');
  const mainImage = document.getElementById('mainImage');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
      const newSrc = this.getAttribute('data-src');
      mainImage.setAttribute('src', newSrc);

      // Optional: تفعيل الصورة المحددة
      thumbnails.forEach(img => img.classList.remove('active-thumb'));
      this.classList.add('active-thumb');
    });
  });

// color selection
const colorOptions = document.querySelectorAll('.color-option');
// const mainImage = document.getElementById('main-image');

// كائن بيربط كل لون باسم الصورة الحقيقي
const colorImageMap = {
  black: 'img/image 2.png',
  green: 'img/image 5.png',
  navy: 'img/52ce3b469d8d7ff6e33f95a574450e07218fc909.png'
};

colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    const selectedColor = option.dataset.color;

    // غير الصورة حسب اللون
    if (colorImageMap[selectedColor]) {
      mainImage.src = `${colorImageMap[selectedColor]}`;
    }
  });
});

// size selection
const sizeButtons = document.querySelectorAll('.size');

sizeButtons.forEach(button => {
  button.addEventListener('click', () => {
    // نشيل الـ active من الكل
    sizeButtons.forEach(btn => btn.classList.remove('active'));

    // نضيف active على الزر اللي اضغط عليه
    button.classList.add('active');
  });
});



// Product Page Quantity Controlconst decreaseBtn = document.querySelector('.decrease');
  const increaseBtn = document.querySelector('.increase');
  const quantityDisplay = document.querySelector('.quantity');
  const decreaseBtn = document.querySelector('.decrease');

  let quantity = 1;

  increaseBtn.addEventListener('click', () => {
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  decreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });



//  عنوان الراتينج
  const tabItems = document.querySelectorAll(".tab-item");
const tabContents = document.querySelectorAll(".tab-content");

tabItems.forEach(item => {
  item.addEventListener("click", () => {
    const tab = item.dataset.tab;

    tabItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    tabContents.forEach(content => {
      content.style.display = content.id === tab ? "block" : "none";
    });
  });
});




const rateBtn = document.getElementById("rateBtn");
const modal = document.getElementById("reviewModal");
const closeBtn = document.querySelector(".closeBtn");
const stars = document.querySelectorAll("#starContainer span");
const submitBtn = document.getElementById("submitReview");

let selectedRating = 0;

// فتح المودال
rateBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// إغلاق المودال
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// اختيار النجوم
stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    selectedRating = index + 1;
    stars.forEach((s, i) => {
      s.style.color = i < selectedRating ? "gold" : "#ccc";
    });
  });
});

// عند الضغط على Submit
submitBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const reviewText = document.getElementById("reviewText").value.trim();

  if (!username || !reviewText || selectedRating === 0) {
    Swal.fire({
      icon: "warning",
      title: "Please complete all fields",
    });
    return;
  }

  const review = {
    username,
    reviewText,
    rating: selectedRating,
    time: new Date().toLocaleString(),
  };

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // غلق المودال
  modal.style.display = "none";

  // مسح الفورم
  document.getElementById("username").value = "";
  document.getElementById("reviewText").value = "";
  stars.forEach((s) => (s.style.color = "#ccc"));
  selectedRating = 0;

  // رسالة تأكيد
  Swal.fire({
    icon: "success",
    title: "Thank you!",
    text: "Your review has been submitted.",
  });
});



document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    const productCard = e.target.closest(".product-card");

    const product = {
      id: productCard.dataset.id,
      name: productCard.querySelector(".product-title").textContent,
      price: productCard.querySelector(".product-price").textContent,
      image: productCard.querySelector("img").src,
    };

    // نحضر السلة من localStorage أو نبدأ بمصفوفة فاضية
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // نضيف المنتج للسلة
    cart.push(product);

    // نحفظ السلة تاني
    localStorage.setItem("cart", JSON.stringify(cart));

    // نروح لصفحة الكارت
    window.location.href = "card.html";
  }
});
