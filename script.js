document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hidden'), 1000);
  
    // Typing effect
    const typed = document.getElementById('typed');
    if (typed) {
      const words = ['à votre rythme', 'avec des experts', 'en quelques semaines', 'et gagnez en compétences'];
      let i = 0, j = 0, forward = true, cur = '';
      function tick() {
        const w = words[i];
        if (forward) {
          cur = w.slice(0, j + 1);
          j++;
          if (j === w.length) {
            forward = false;
            setTimeout(tick, 900);
            return;
          }
        } else {
          cur = w.slice(0, j - 1);
          j--;
          if (j === 0) {
            forward = true;
            i = (i + 1) % words.length;
          }
        }
        typed.textContent = cur;
        setTimeout(tick, forward ? 90 : 40);
      }
      tick();
    }
  
    // Intersection observer for fade-up
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  
    // Testimonials slider
    const slides = document.querySelectorAll('.slide');
    if (slides.length) {
      let idx = 0;
      function showSlide(n) {
        idx = (n + slides.length) % slides.length;
        const wrap = document.getElementById('slides');
        wrap.style.transform = `translateX(${-idx * 100}%)`;
      }
      document.getElementById('prev')?.addEventListener('click', () => showSlide(idx - 1));
      document.getElementById('next')?.addEventListener('click', () => showSlide(idx + 1));
      setInterval(() => showSlide(idx + 1), 6000);
    }
  
    // Modal flow
    window.openModal = (title, price) => {
      const content = document.getElementById('modalContent');
      content.innerHTML = `
        <h3 id="modalTitle" style="margin-top:2px">${title}</h3>
        <p style="color:var(--muted)">Prix: ${price ? price + '€' : 'Gratuit / Demo'}</p>
        <p style="margin-top:8px">Ce est un exemple de modal de vente. Intégrez Stripe/PayPal pour traiter les paiements.</p>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="cta" onclick="showToast('Inscription réussie !'); closeModal()" aria-label="Acheter ${title}">Acheter</button>
          <button class="nav-link" onclick="closeModal()" aria-label="Fermer">Fermer</button>
        </div>`;
      document.getElementById('modal').classList.add('show');
    };
    window.closeModal = () => {
      document.getElementById('modal').classList.remove('show');
    };
  
    // Enroll CTA
    document.getElementById('joinTop')?.addEventListener('click', () => {
      window.location.href = '#courses';
    });
    document.getElementById('explore')?.addEventListener('click', () => {
      window.location.href = '#courses';
    });
    document.getElementById('previewDemo')?.addEventListener('click', () => openModal('Aperçu du site', 0));
    document.getElementById('buyNow')?.addEventListener('click', () => showToast('Abonnement activé !'));
  
    // Dark/Light Mode Toggle
    document.getElementById('modeToggle')?.addEventListener('change', (e) => {
      document.body.classList.toggle('light-mode', e.target.checked);
      localStorage.setItem('theme', e.target.checked ? 'light' : 'dark');
    });
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode');
      document.getElementById('modeToggle').checked = true;
    }
  
    // Particles for creative effect
    if (document.getElementById('particles-js')) {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: ['#7c5cff', '#00d4ff'] },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
          modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
      });
    }
  
    // Countdown Timer
    const countdown = document.getElementById('countdown');
    if (countdown) {
      const countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
      const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdown.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
        if (distance < 0) {
          clearInterval(countdownInterval);
          countdown.innerHTML = 'Expirée';
        }
      }, 1000);
    }
  
    // Toast Notification
    window.showToast = (message) => {
      const toast = document.getElementById('toast');
      toast.innerHTML = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    };
  
    // Progressive enhancement: lazy load images
    document.querySelectorAll('img').forEach(img => img.loading = 'lazy');
  
    // Smooth scroll
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  });