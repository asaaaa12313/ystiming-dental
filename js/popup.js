// ═══════════════════════════════════════
// 연세타이밍치과 팝업 로직
// localStorage 기반 24시간 쿠키 처리
// ═══════════════════════════════════════

(function() {
  var overlay = document.getElementById('popup-overlay');
  var popupEvent = document.getElementById('popup-event');
  var popupNotice = document.getElementById('popup-notice');

  function shouldShow(key) {
    var ts = localStorage.getItem(key);
    if (!ts) return true;
    return Date.now() - parseInt(ts, 10) > 24 * 60 * 60 * 1000;
  }

  function hidePopup(id, save24h) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
    if (save24h) {
      localStorage.setItem(id, Date.now().toString());
    }
    // 둘 다 닫히면 오버레이 제거
    if (popupEvent.style.display === 'none' && popupNotice.style.display === 'none') {
      overlay.classList.add('hidden');
    }
  }

  // 초기 표시 여부
  if (!shouldShow('popup-event')) popupEvent.style.display = 'none';
  if (!shouldShow('popup-notice')) popupNotice.style.display = 'none';

  if (popupEvent.style.display === 'none' && popupNotice.style.display === 'none') {
    overlay.classList.add('hidden');
  }

  // 24시간 닫기 버튼
  var close24hBtns = document.querySelectorAll('.popup-close-24h');
  for (var i = 0; i < close24hBtns.length; i++) {
    close24hBtns[i].addEventListener('click', function() {
      hidePopup(this.getAttribute('data-popup'), true);
    });
  }

  // 닫기 버튼
  var closeBtns = document.querySelectorAll('.popup-close-btn');
  for (var j = 0; j < closeBtns.length; j++) {
    closeBtns[j].addEventListener('click', function() {
      hidePopup(this.getAttribute('data-popup'), false);
    });
  }

  // 오버레이 클릭 시 전부 닫기
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      hidePopup('popup-event', false);
      hidePopup('popup-notice', false);
    }
  });
})();
