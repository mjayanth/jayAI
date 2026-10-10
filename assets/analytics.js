(function () {
  // Only collect traffic from this published site, never local files or previews.
  if (window.location.protocol !== 'https:' || window.location.hostname !== 'mjayanth.github.io' || !window.location.pathname.startsWith('/jayAI/')) return;
  if (document.querySelector('script[data-cf-beacon]')) return;
  var beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.setAttribute('data-cf-beacon', JSON.stringify({ token: 'e6f6eac50a1b4995bfe1cc2f482f67b0' }));
  document.body.appendChild(beacon);
})();
