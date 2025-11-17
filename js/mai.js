// Toggle theme script - ghi vào ./js/mai.js (đã có trong HTML)
(function () {
    const STORAGE_KEY = 'site-theme'; // 'dark' | 'light'
    const toggle = document.getElementById('theme-checkbox');
    const root = document.documentElement;
  
    function applyTheme(theme) {
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
    }
  
    function getSystemPrefersDark() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  
    function init() {
      // Apply small transition class after load to avoid flashing during initial paint
      // (keeps first paint immediate; transitions only for user toggles)
      requestAnimationFrame(() => {
        document.documentElement.classList.add('theme-transition');
      });
  
      const saved = localStorage.getItem(STORAGE_KEY);
      const systemDark = getSystemPrefersDark();
      const initial = saved || (systemDark ? 'dark' : 'light');
  
      applyTheme(initial);
  
      if (toggle) {
        toggle.checked = (initial === 'dark');
        toggle.addEventListener('change', (e) => {
          const newTheme = e.target.checked ? 'dark' : 'light';
          applyTheme(newTheme);
          localStorage.setItem(STORAGE_KEY, newTheme);
        });
      }
  
      // If user hasn't saved a preference, respond to system changes
      if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener?.('change', (e) => {
          const savedNow = localStorage.getItem(STORAGE_KEY);
          if (!savedNow) {
            applyTheme(e.matches ? 'dark' : 'light');
            if (toggle) toggle.checked = e.matches;
          }
        });
      }
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
  // --- Bổ sung Logic Menu Mobile ---

(function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.querySelector('body');
    // Menu toggle chỉ hoạt động nếu phần tử tồn tại
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Thêm/Xóa class 'open' trên nút toggle để chuyển icon 3 gạch <-> X
            menuToggle.classList.toggle('open');
            
            // Thêm/Xóa class 'menu-open' trên thẻ body để kích hoạt CSS mở menu
            body.classList.toggle('menu-open');
        });
    }

    // Tùy chọn: Đóng menu khi người dùng click vào bất kỳ link nào
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (body.classList.contains('menu-open')) {
                menuToggle.classList.remove('open');
                body.classList.remove('menu-open');
            }
        });
    });
})();