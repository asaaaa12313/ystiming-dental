// ═══════════════════════════════════════
// 연세타이밍치과 메인 인터랙션
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {

  // ── 1. 인트로 시퀀스 ──
  var intro = document.getElementById('intro');
  if (intro) {
    document.body.style.overflow = 'hidden';
    setTimeout(function() { intro.classList.add('phase-1'); }, 300);   // 로고 등장
    setTimeout(function() { intro.classList.add('phase-2'); }, 900);   // 연세타이밍치과 글자
    setTimeout(function() { intro.classList.add('phase-3'); }, 2600);  // 브랜드 사라짐
    setTimeout(function() { intro.classList.add('phase-4'); }, 3200);  // 정확한 진단
    setTimeout(function() { intro.classList.add('phase-5'); }, 4000);  // 정직한 진료
    setTimeout(function() { intro.classList.add('phase-6'); }, 5200);  // 슬로건 사라짐
    setTimeout(function() {
      intro.classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(function() { intro.remove(); }, 600);
    }, 6000);
  }

  // ── 2. 스크롤 헤더 ──
  var header = document.getElementById('header');
  var infoBar = document.getElementById('info-bar');

  function onScroll() {
    var scrolled = window.scrollY > 50;
    header.classList.toggle('hdr-s', scrolled);
    header.classList.toggle('hdr-t', !scrolled);
    if (infoBar) {
      infoBar.classList.toggle('hidden', scrolled);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── 3. 진료 탭 전환 ──
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = this.getAttribute('data-tab');
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      tabPanels.forEach(function(p) { p.classList.remove('active'); });
      this.classList.add('active');
      var target = document.querySelector('[data-panel="' + idx + '"]');
      if (target) target.classList.add('active');
    });
  });

  // ── 4. 스크롤 리빌 (IntersectionObserver) ──
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(function(el) {
      revealObserver.observe(el);
    });
  } else {
    // fallback: 전부 보여주기
    reveals.forEach(function(el) { el.classList.add('revealed'); });
  }

  // ── 5. 모바일 햄버거 메뉴 ──
  var hamburger = document.getElementById('hamburger');
  var drawer = document.getElementById('drawer');
  var drawerClose = document.getElementById('drawer-close');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function() {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    function closeDrawer() {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    drawer.addEventListener('click', function(e) {
      if (e.target === drawer) closeDrawer();
    });

    // 메뉴 링크 클릭 시 드로어 닫기
    var drawerLinks = drawer.querySelectorAll('.drawer-menu a');
    drawerLinks.forEach(function(link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ── 6. 앵커 스크롤 오프셋 ──
  var menuLinks = document.querySelectorAll('a[href^="#"]');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = header.offsetHeight;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── 7. (자동재생으로 변경됨)

  // ── 8. 모바일 히어로 영상 교체 ──
  var heroVideo = document.getElementById('hero-video');
  if (heroVideo && window.innerWidth <= 768) {
    var source = heroVideo.querySelector('source');
    if (source) {
      source.setAttribute('src', 'assets/videos/hero-bg-mobile.mp4');
      heroVideo.load();
    }
  }

});
