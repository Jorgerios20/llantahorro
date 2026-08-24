/* =========================================================
   LLANTAHORRO — JS PRINCIPAL
   Navbar + AOS (scroll reveal) + GSAP (entrada hero y
   microinteracciones: botones magnéticos, tarjetas con tilt)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Año actual en el footer ---------- */
  const anio = document.getElementById('anioActual');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Navbar: fondo sólido al hacer scroll ---------- */
  const nav = document.getElementById('mainNavbar');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* ---------- Cerrar menú móvil al elegir una sección ---------- */
  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      if (menu && menu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* ---------- AOS: revela secciones al hacer scroll ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  const sinAnimaciones = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- GSAP: entrada dinámica del hero ---------- */
  if (window.gsap && !sinAnimaciones) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge', { y: -18, opacity: 0, duration: .6 })
      .from('.hero-title', { y: 45, opacity: 0, duration: .8 }, '-=.3')
      .from('.hero-subtitle', { y: 20, opacity: 0, duration: .6 }, '-=.45')
      .from('.hero-description', { y: 20, opacity: 0, duration: .6 }, '-=.45')
      .from('.hero-buttons a', { y: 20, opacity: 0, duration: .5, stagger: .15 }, '-=.35')
      .from('.hero-stat', { y: 20, opacity: 0, duration: .5, stagger: .12 }, '-=.3')
      .from('#heroProduct', { x: 50, opacity: 0, duration: .9, ease: 'power2.out' }, '-=.8');
  }

  /* Sólo activar interacciones de mouse en pantallas con puntero fino (desktop) */
  const esDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Botones magnéticos ---------- */
  if (window.gsap && esDesktop && !sinAnimaciones) {
    const strength = 22;
    document.querySelectorAll('.btn-main, .btn-secondary, .btn-cta').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: (x / rect.width) * strength,
          y: (y / rect.height) * strength,
          duration: .3,
          ease: 'power2.out'
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1, .45)' });
      });
    });

    /* ---------- Tarjetas con efecto tilt (servicios, datos, contacto) ---------- */
    const maxTilt = 8;
    document.querySelectorAll('.servicio-card, .dato-card, .contacto-card').forEach(card => {
      card.style.transformPerspective = '800px';
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - .5;
        const py = (e.clientY - rect.top) / rect.height - .5;
        gsap.to(card, {
          rotateY: px * maxTilt,
          rotateX: -py * maxTilt,
          y: -6,
          duration: .4,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, duration: .6, ease: 'power3.out' });
      });
    });
  }

});
