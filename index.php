<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RentVerse - Home</title>
  <link rel="stylesheet" href="styles.css">
  <!-- Google Fonts for better typography -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <!-- Font Awesome for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
  <!-- Header with Logo and Navigation -->
  <header>
  <div class="logo">
    <h1><a href="index.html">RentVerse</a></h1>
  </div>

  <nav id="main-nav">
    <button class="mobile-menu-toggle" id="mobile-menu-toggle">
      <i class="fas fa-bars"></i>
    </button>
    <ul>
      <?php
      if (isset($_COOKIE['user_email'])) {
        $user_email = htmlspecialchars($_COOKIE['user_email']);
        echo '
        <li class="user-hover">
          <a href="account.html"><i class="fas fa-user-circle"></i> Profile</a>
          <div class="hover-email">' . $user_email . '</div>
        </li>
        <li class="user-hover">
          <a href="cart.html" id="cart-link"><i class="fas fa-shopping-cart"></i> Cart</a>
          <div class="hover-email">' . $user_email . '</div>
        </li>
        <li class="user-hover">
          <a href="login/logout.php"><i class="fas fa-sign-out-alt"></i> Logout</a>
          <div class="hover-email">' . $user_email . '</div>
        </li>';
      } else {
        echo '
        <li>
          <a href="login/index.php"><i class="fas fa-sign-in-alt"></i> Login</a>
        </li>';
      }
      ?>

      <li class="more-menu">
        <button class="more-button"><i class="fas fa-ellipsis-v"></i></button>
        <div class="dropdown-content">
          <a href="give-on-rent.html"><i class="fas fa-hand-holding-usd"></i> Give on Rent</a>
          <a href="customer-care.html"><i class="fas fa-headset"></i> Customer Care</a>
          <a href="feedback.html"><i class="fas fa-comment-alt"></i> Feedback</a>
          <a href="wishlist.html"><i class="fas fa-heart"></i> Wishlist</a>
        </div>
      </li>
    </ul>
  </nav>
</header>



  <!-- Main Content Section -->
  <main>
    <!-- Hero Section with Slider -->
    <section class="hero-slider" id="hero-slider">
      <div class="slide slide-1 active">
        <div class="slide-content">
          <h2>Welcome to RentVerse!</h2>
          <p>Rent quality products at unbeatable prices with doorstep delivery and hassle-free returns.</p>
          <a href="#categories" class="cta-button">Explore Categories</a>
        </div>
      </div>
      <div class="slide slide-2">
        <div class="slide-content">
          <h2>Give Your Items on Rent</h2>
          <p>Turn your unused items into passive income by listing them on our platform.</p>
          <a href="give-on-rent.html" class="cta-button">List Your Items</a>
        </div>
      </div>
      <div class="slide slide-3">
        <div class="slide-content">
          <h2>Special Offer!</h2>
          <p>Get 20% off on your first rental. Limited time offer.</p>
          <a href="offers.html" class="cta-button">View Offers</a>
        </div>
      </div>
      <div class="slider-nav">
        <div class="slider-nav-dot active" data-slide="0"></div>
        <div class="slider-nav-dot" data-slide="1"></div>
        <div class="slider-nav-dot" data-slide="2"></div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories" id="categories">
      <h3>Shop by Category</h3>
      <div class="category-container">
        <a href="furniture.html" class="category-link">
          <img src="images\furniture.jpeg" alt="Furniture category image" class="category-img">
          <p>Furniture</p>
        </a>
        <a href="electronics.html" class="category-link">
          <img src="images\electonics.jpg" alt="Electronics category image" class="category-img">
          <p>Electronics</p>
        </a>
        <a href="clothes.html" class="category-link">
          <img src="images/clothes.jpg" alt="Clothes category image" class="category-img">
          <p>Clothes</p>
        </a>
        <a href="antiques.html" class="category-link">
          <img src="images/antiques.jpg" alt="Antiques category image" class="category-img">
          <p>Antiques</p>
        </a>
        <a href="medical-equipment.html" class="category-link">
          <img src="images/medical.jpg" alt="Medical Equipment category image" class="category-img">
          <p>Medical Equipment</p>
        </a>
        <a href="books.html" class="category-link">
          <img src="images/book.jpg" alt="Books category image" class="category-img">
          <p>Books</p>
        </a>
      </div>
    </section>
  </main>

  <!-- Enhanced Footer Section -->
  <footer>
    <div class="footer-container">
      <div class="footer-column">
        <h4>About RentVerse</h4>
        <ul>
          <li><a href="about-us.html">About Us</a></li>
          <li><a href="our-team.html">Our Team</a></li>
          <li><a href="careers.html">Careers</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="press.html">Press & Media</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4>Customer Service</h4>
        <ul>
          <li><a href="contact-us.html">Contact Us</a></li>
          <li><a href="faq.html">FAQs</a></li>
          <li><a href="shipping-policy.html">Shipping Policy</a></li>
          <li><a href="return-policy.html">Return Policy</a></li>
          <li><a href="help-center.html">Help Center</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4>Renting</h4>
        <ul>
          <li><a href="how-it-works.html">How It Works</a></li>
          <li><a href="give-on-rent.html">Give on Rent</a></li>
          <li><a href="damage-protection.html">Damage Protection</a></li>
          <li><a href="renter-verification.html">Renter Verification</a></li>
          <li><a href="success-stories.html">Success Stories</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4>Stay Connected</h4>
        <p>Subscribe to our newsletter for the latest updates and offers.</p>
        <form class="newsletter-form">
          <input type="email" placeholder="Your email address">
          <button type="submit">Subscribe</button>
        </form>
        <div class="social-links">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-pinterest"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 RentVerse. All Rights Reserved.</p>
      <p>
        <a href="privacy-policy.html">Privacy Policy</a> | 
        <a href="terms-of-service.html">Terms of Service</a> | 
        <a href="sitemap.html">Sitemap</a> | 
        <a href="accessibility.html">Accessibility</a>
      </p>
    </div>
  </footer>

  <script src="script.js"></script>
  
  <!-- JavaScript for Slider and Menu -->
  <script>
    // Mobile Menu Toggle
    document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
      document.getElementById('main-nav').classList.toggle('active');
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-nav-dot');
    let currentSlide = 0;
    
    function showSlide(n) {
      // Hide all slides
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show selected slide
      slides[n].classList.add('active');
      dots[n].classList.add('active');
      currentSlide = n;
    }
    
    // Add click event to dots
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        let slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
      });
    });
    
    // Auto slide
    setInterval(function() {
      let nextSlide = (currentSlide + 1) % slides.length;
      showSlide(nextSlide);
    }, 5000);
  </script>

<script>
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartLink = document.getElementById("cart-link");
    if (cartLink) {
      cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${cart.length})`;
    }
  };

  document.querySelectorAll(".rent-button").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const item = {
        name: card.dataset.name,
        category: card.dataset.category,
        price: card.dataset.price
      };
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${item.name} added to cart!`);
    });
  });

  updateCartCount();
</script>

</body>
</html>