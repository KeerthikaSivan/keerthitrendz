// ✅ Navbar toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ✅ Booking Form Submission
const form = document.getElementById("bookingForm");
const responseMsg = document.getElementById("responseMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    service: form.service.value,
    details: form.details.value
  };

  try {
    const res = await fetch("http://localhost:3000/book-service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    responseMsg.textContent = data.message;
    responseMsg.style.color = "lightgreen";
    form.reset();
  } catch (err) {
    responseMsg.textContent = "❌ Failed to connect to server.";
    responseMsg.style.color = "red";
  }
});

// ✅ Three.js 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Particles
const geometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}
geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.8 });
const particles = new THREE.Points(geometry, material);
scene.add(particles);
camera.position.z = 5;

// Animation
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.0008;
  particles.rotation.x += 0.0005;
  particles.position.y = Math.sin(Date.now() * 0.0005) * 0.2;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
