export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    merchant: "The Ground Between Store",
    astraeId: "ASTRAE-3GrCBd4w7RU9PrvgyXr5yA",
    url: "https://www.thegroundbetween.com",
    currency: "AUD",
    skus: [
      {
        id: "BOOK-PAPERBACK-001",
        title: "Between Fear and Hope (Paperback Edition)",
        price: 17.99,
        currency: "AUD",
        availability: "in_stock",
        checkout_url: "https://www.thegroundbetween.com/collection"
      },
      {
        id: "BOOK-HARDCOVER-001",
        title: "Between Fear and Hope (Hardcover Edition)",
        price: 24.99,
        currency: "AUD",
        availability: "in_stock",
        checkout_url: "https://www.thegroundbetween.com/collection"
      },
      {
        id: "BOOK-GREEK-001",
        title: "Μεταξύ Φόβου και Ελπίδας (Δίγλωσση Έκδοση)",
        price: 24.99,
        currency: "AUD",
        availability: "in_stock",
        checkout_url: "https://www.thegroundbetween.com/collection"
      }
    ],
    fetchedAt: new Date().toISOString()
  });
}
