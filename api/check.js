export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Missing group ID"
    });
  }

  try {
    const response = await fetch(
      `https://groups.roblox.com/v1/groups/${id}`
    );

    // Group does not exist
    if (!response.ok) {
      return res.status(200).json({
        success: true,
        exists: false,
        unowned: false,
        deleted: true,
        id
      });
    }

    const data = await response.json();

    const hasOwner = !!data.owner;

    return res.status(200).json({
      success: true,
      exists: true,
      id: data.id,
      name: data.name,
      owner: hasOwner ? data.owner.username : null,
      unowned: !hasOwner,
      members: data.memberCount
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
