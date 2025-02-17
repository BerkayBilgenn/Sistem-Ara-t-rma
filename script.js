
document.addEventListener("DOMContentLoaded", function () {
  // **Navbar Menü Açma / Kapama İşlevi**
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.querySelector("nav ul"); // Eğer ID kullanıyorsan bunu "menu" olarak değiştir

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  } else {
    console.error(
      "Menü elemanları bulunamadı! ID veya class adını kontrol edin."
    );
  }

  // **Three.js Sahne Kurulumu**
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(50);

  // **Yıldızlar**
  const stars = [];
  function addStar() {
    const geometry = new THREE.SphereGeometry(0.8, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x6600ff,
      emissiveIntensity: 1.2,
    });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(400));
    star.position.set(x, y, z);
    scene.add(star);
    stars.push(star);
  }
  Array(600).fill().forEach(addStar);

  // **Işıklandırma**
  const pointLight = new THREE.PointLight(0xffffff, 2, 300);
  pointLight.position.set(20, 20, 20);
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(pointLight, ambientLight);

  // **Mouse Hareket Çizgisi**
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xff00ff,
    linewidth: 10,
    opacity: 1,
    transparent: true,
  });

  const linePoints = [];
  const lineGeometry = new THREE.BufferGeometry();
  const mouseLine = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(mouseLine);

  document.addEventListener("mousemove", (event) => {
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1;
    let newPos = new THREE.Vector3(x * 60, y * 40, 0);

    linePoints.push(newPos);

    if (linePoints.length > 150) {
      linePoints.shift();
    }

    lineGeometry.setFromPoints(linePoints);
  });

  // **Yıldız Animasyonu**
  function animate() {
    requestAnimationFrame(animate);

    stars.forEach((star, index) => {
      star.position.z += 0.4;
      star.material.emissiveIntensity =
        Math.sin(Date.now() * 0.002 + index) * 1 + 1;

      if (star.position.z > 200) star.position.z = -200;
    });

    renderer.render(scene, camera);
  }

  // **Responsive Ayarlar**
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
