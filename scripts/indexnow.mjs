// Dopo ogni build di PRODUZIONE su Vercel: avvisa i motori (IndexNow) delle pagine che cambiano con casi e soluzioni.
// La chiave è pubblica per natura (sta in public/<chiave>.txt). Mai un errore di build: se il ping fallisce, si va avanti.
const SITO = 'https://www.ivanosciretta.tech'
const CHIAVE = 'b14d42d78844d4f484a4598070dd14e2'
if (process.env.VERCEL_ENV !== 'production') process.exit(0)
const urlList = ['/soluzioni', '/soluzioni/olio', '/lavori', '/chi-sono', '/osservatorio/olio', '/sitemap.xml'].map((p) => SITO + p)
try {
  const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify({ host: 'www.ivanosciretta.tech', key: CHIAVE, keyLocation: `${SITO}/${CHIAVE}.txt`, urlList }), signal: AbortSignal.timeout(10_000) })
  console.log('IndexNow:', r.status)
} catch (e) {
  console.log('IndexNow non raggiunto:', e.message)
}
