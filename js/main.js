// ═══════════════════════════════════════
// 연세타이밍치과 메인 페이지 전용
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {

  // ── 1. 인트로 시퀀스 ──
  var intro = document.getElementById('intro');
  if (intro) {
    document.body.style.overflow = 'hidden';
    setTimeout(function() { intro.classList.add('phase-1'); }, 300);
    setTimeout(function() { intro.classList.add('phase-2'); }, 1400);
    setTimeout(function() { intro.classList.add('phase-3'); }, 2800);
    setTimeout(function() { intro.classList.add('phase-4'); }, 3400);
    setTimeout(function() {
      intro.classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(function() { intro.remove(); }, 600);
    }, 5200);
  }

  // ── 2. 모바일 히어로 영상 교체 ──
  var heroVideo = document.getElementById('hero-video');
  if (heroVideo && window.innerWidth <= 768) {
    var source = heroVideo.querySelector('source');
    if (source) {
      source.setAttribute('src', '/assets/videos/hero-bg-mobile.mp4');
      heroVideo.load();
    }
  }

});
