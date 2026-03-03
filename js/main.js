// ═══════════════════════════════════════
// 연세타이밍치과 메인 페이지 전용
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {

  // ── 1. 인트로 시퀀스 ──
  var intro = document.getElementById('intro');
  if (intro) {
    document.body.style.overflow = 'hidden';
    setTimeout(function() { intro.classList.add('phase-1'); }, 400);   // "정확한 진단"
    setTimeout(function() { intro.classList.add('phase-2'); }, 1500);  // "정직한 진료" + 서브
    setTimeout(function() { intro.classList.add('phase-3'); }, 3000);  // 슬로건 사라짐
    setTimeout(function() { intro.classList.add('phase-4'); }, 3800);  // "연세타이밍" 순차 등장
    setTimeout(function() { intro.classList.add('phase-5'); }, 4800);  // "치과" 파란색
    setTimeout(function() {
      intro.classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(function() { intro.remove(); }, 800);
    }, 6200);
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
