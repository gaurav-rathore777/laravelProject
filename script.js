const nav = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');
const toggleButton = document.querySelector('.menu-toggle');

// Toggle sidebar open/close
function toggleMenu() {
  nav.classList.toggle('active');
  overlay.classList.toggle('show');
}

// Close sidebar
function closeMenu() {
  nav.classList.remove('active');
  overlay.classList.remove('show');
}

// Load page from /pages/
function navigate(page) {
  closeMenu(); // close sidebar on navigation

  fetch(`pages/${page}.html`)
    .then((response) => {
      if (!response.ok) throw new Error('Page not found');
      return response.text();
    })
    .then((html) => {
      const contentDiv = document.getElementById('content');
      contentDiv.innerHTML = html;

      // Run any inline scripts in loaded HTML
      const scripts = contentDiv.querySelectorAll('script');
      scripts.forEach((script) => {
        const newScript = document.createElement('script');
        newScript.text = script.textContent;
        document.body.appendChild(newScript);
      });
    })
    .catch((error) => {
      document.getElementById('content').innerHTML = `
        <h2>404 - Page Not Found</h2>
        <p>Could not load ${page}.html</p>
      `;
      console.error(error);
    });
}

// Close sidebar when clicking outside
document.addEventListener('click', function (event) {
  const isClickInsideNav = nav.contains(event.target);
  const isClickOnToggle = toggleButton.contains(event.target);

  if (!isClickInsideNav && !isClickOnToggle) {
    closeMenu();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  navigate('home');
});


  const cursorDot = document.querySelector(".cursor-dot");
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    dotX += (mouseX - dotX) * 0.12;
    dotY += (mouseY - dotY) * 0.12;
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    requestAnimationFrame(animate);
  }

  animate();


 