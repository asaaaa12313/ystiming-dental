// ═══════════════════════════════════════
// 연세타이밍치과 공통 인터랙션
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
  var p = window.includesReady || Promise.resolve();
  p.then(function() {
    initScrollHeader();
    initHamburger();
    initScrollReveal();
  });
});

function initScrollHeader() {
  var header = document.getElementById('header');
  var infoBar = document.getElementById('info-bar');
  if (!header) return;

  var isMainPage = document.body.classList.contains('main-page');

  if (isMainPage) {
    header.classList.remove('hdr-s');
    header.classList.add('hdr-t');

    function onScroll() {
      var scrolled = window.scrollY > 50;
      header.classList.toggle('hdr-s', scrolled);
      header.classList.toggle('hdr-t', !scrolled);
      if (infoBar) infoBar.classList.toggle('hidden', scrolled);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

function initHamburger() {
  var hamburger = document.getElementById('hamburger');
  var drawer = document.getElementById('drawer');
  var drawerClose = document.getElementById('drawer-close');

  if (!hamburger || !drawer) return;

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

  // 아코디언 토글
  var categories = drawer.querySelectorAll('.drawer-category');
  categories.forEach(function(cat) {
    cat.addEventListener('click', function() {
      var submenu = this.nextElementSibling;
      var wasOpen = this.classList.contains('open');
      categories.forEach(function(c) {
        c.classList.remove('open');
        if (c.nextElementSibling) c.nextElementSibling.classList.remove('open');
      });
      if (!wasOpen) {
        this.classList.add('open');
        if (submenu) submenu.classList.add('open');
      }
    });
  });

  // 링크 클릭 시 드로어 닫기
  var drawerLinks = drawer.querySelectorAll('.drawer-submenu a');
  drawerLinks.forEach(function(link) {
    link.addEventListener('click', closeDrawer);
  });
}

function initScrollReveal() {
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function(el) { observer.observe(el); });
  } else {
    reveals.forEach(function(el) { el.classList.add('revealed'); });
  }
}
