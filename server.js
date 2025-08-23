// ✅ Navbar toggle
document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// ✅ Booking form submission
const bookingForm = document.getElementById('bookingForm');
const responseMessage = document.getElementById('responseMessage');

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    name: bookingForm.name.value,
    email: bookingForm.email.value,
    service: bookingForm.service.value,
    details: bookingForm.details.value
  };

  try {
    const res = await fetch('http://localhost:3000/book-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    responseMessage.textContent = data.message;
    responseMessage.style.color = "lightgreen";
    bookingForm.reset();
  } catch (error) {
    console.error("Error:", error);
    responseMessage.textContent = "❌ Failed to submit booking.";
    responseMessage.style.color = "red";
  }
});

// ✅ 3D Background using Three.js
const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

// Geometry
const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 5000; i++) {
  vertices.push((Math.random() - 0.5) * 10);
  vertices.push((Math.random() - 0.5) * 10);
  vertices.push((Math.random() - 0.5) * 10);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

// Material
const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.05,
  transparent: true,
  opacity: 0.8
});

// Points
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.z = 5;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Animate
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.0008;
  particles.rotation.x += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
