/* Quorbit public play stats in the site footer. Fails silent. */
(function () {
  var el = document.querySelector('[data-play-stats]');
  if (!el) return;
  fetch('https://submit.iquorbit.com/api/stats', { credentials: 'omit' })
    .then(function (r) { if (!r.ok) throw new Error('stats'); return r.json(); })
    .then(function (d) {
      var q = Number(d && d.questions), g = Number(d && d.games);
      if (!(q > 0) || !(g > 0)) return;
      var fmt = function (n) { return Math.round(n).toLocaleString('en-US'); };
      el.innerHTML = '<span class="site-foot-stat-n">' + fmt(q) + '</span> questions answered<span class="site-foot-stat-sep"> · </span><span class="site-foot-stat-n">' + fmt(g) + '</span> games played';
      el.hidden = false;
    })
    .catch(function () {});
})();
