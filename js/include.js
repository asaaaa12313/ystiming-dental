(function() {
  var promises = [];

  var headerEl = document.getElementById('header-placeholder');
  var footerEl = document.getElementById('footer-placeholder');

  if (headerEl) {
    promises.push(
      fetch('/includes/header.html')
        .then(function(r) { return r.text(); })
        .then(function(html) {
          headerEl.insertAdjacentHTML('afterend', html);
          headerEl.remove();
        })
    );
  }

  if (footerEl) {
    promises.push(
      fetch('/includes/footer.html')
        .then(function(r) { return r.text(); })
        .then(function(html) {
          footerEl.insertAdjacentHTML('afterend', html);
          footerEl.remove();
        })
    );
  }

  window.includesReady = Promise.all(promises);
})();
