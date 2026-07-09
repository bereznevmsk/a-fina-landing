(function () {
  document.querySelectorAll('.navbar-toggle').forEach(function (toggle) {
    var menu = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!menu) return;

    function openMenu() {
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu(returnFocus) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('open')) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('open')) return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      closeMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu(true);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && menu.classList.contains('open')) {
        closeMenu(false);
      }
    });
  });
})();
