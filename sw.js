const binidle_cache = "binidle-b-0-5-2"
const assets = [
  "/",
  "/index.html",
  "/style.css",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(binidle_cache).then(cache => {
      cache.addAll(assets)
    })
  )
})
