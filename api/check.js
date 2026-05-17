export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'Missing group ID'
    });
  }

  try {
    const response = await fetch(`https://groups.roblox.com/v1/groups/${id}`);

    if (response.ok) {
      const data = await response.json();

      return res.status(200).json({
        success: true,
        exists: true,
        id: data.id,
        name: data.name,
        owner: data.owner?.username || null,
        members: data.memberCount,
        publicEntryAllowed: data.publicEntryAllowed
      });
    }

    return res.status(200).json({
      success: true,
      exists: false,
      id
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
