export async function saveEnquiry(db, enquiry, payloadHash) {
  const { id, name, email, organisation, topic, message, source } = enquiry;
  const results = await db.batch([
    db
      .prepare(
        "INSERT INTO enquiries (id, name, email, organisation, topic, message, source, payload_hash, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING",
      )
      .bind(
        id,
        name,
        email,
        organisation,
        topic,
        message,
        source,
        payloadHash,
        Date.now(),
      ),
    db.prepare("SELECT payload_hash FROM enquiries WHERE id = ?").bind(id),
  ]);
  if (results.some((result) => result.success === false))
    throw new Error("Storage unavailable");
  return results[1]?.results?.[0]?.payload_hash === payloadHash;
}
