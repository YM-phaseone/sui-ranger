// ─────────────────────────────────────────────
//  WaterRanger – script.js  (jQuery 3.7.0)
// ─────────────────────────────────────────────
$(function () {
  /* ===== ① ナビゲーション・ホバーインジケーター ===== */
  const $nav   = $('.header__nav');
  const $links = $('.header__link');

  function updateIndicator($target) {
    const navLeft    = $nav.offset().left;
    const centerX    = $target.offset().left + $target.outerWidth() / 2;
    const relativeX  = centerX - navLeft;

    $nav.removeClass('has-hover');
    document.documentElement.style.setProperty('--indicator-x', `${relativeX}px`);

    requestAnimationFrame(() => {
      $nav.addClass('has-hover');
    });
  }

  $links.on('mouseenter', function () { updateIndicator($(this)); });
  $nav.on('mouseleave',  () => { $nav.removeClass('has-hover'); });

  /* ===== ② ハンバーガー（ドロワー）メニュー ===== */
  const $drawerBtn = $('.drawer-icon');
  const $drawer    = $('#js-drawer-content');
  const $body      = $('body');

  $drawerBtn.on('click', function () {
    $(this).toggleClass('is-checked');
    $drawer.toggleClass('is-open');
    $body.toggleClass('is-fixed');

    // バーメニューのクロス／ハンバーガー切替
    const $bars  = $(this).find('.drawer-icon__bar');
    const isOpen = $(this).hasClass('is-checked');

    if (isOpen) {
      $bars.eq(0).css({ top: '10px', transform: 'rotate(30deg)',  background: '#fff' });
      $bars.eq(1).css({ opacity: '0' });
      $bars.eq(2).css({ top: '10px', transform: 'rotate(-30deg)', background: '#fff' });
    } else {
      $bars.eq(0).css({ top: '0',  transform: 'rotate(0)', background: '#333' });
      $bars.eq(1).css({ opacity: '1' });
      $bars.eq(2).css({ top: '18px', transform: 'rotate(0)', background: '#333' });
    }
  });

  /* ===== ③ ヒーロー画像 スクロール位置で発火（PCのみ） ===== */
  // PCの場合のみヒーロー画像の表示を制御
  if (window.innerWidth >= 768) {
    const heroImage = document.getElementById('js-hero-image');
    let isShown = false;

    // スクロールイベントリスナーを設定
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || window.pageYOffset;

      // スクロール位置が50pxを超えたらヒーロー画像を表示
      if (!isShown && scrollY > 50) {
        heroImage.classList.add('is-visible');
        isShown = true;
      }
    });
  }

/* ===== ④ ヘッダーの固定表示とガタつき防止（初期化対応） ===== */
$(function () {
  const header = document.querySelector('.header');
  const target = document.querySelector('#observer-target');

  if (header && target) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            header.classList.add('is-fixed');
          } else {
            header.classList.remove('is-fixed');
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(target);
  }

});
});