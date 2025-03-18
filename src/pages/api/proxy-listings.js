export default async function handler(req, res) {
  const { page, perPage } = req.query;
  
  try {
    const response = await fetch(
      `https://a1-lemon.vercel.app/api/listings?page=${page}&perPage=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}