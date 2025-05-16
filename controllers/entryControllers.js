import { getConnection, execute } from '../models/db.js';

export async function addTruckEntry(req, res) {
  const { truck_number, total_weight, waste_distribution } = req.body;

  const connection = await getConnection();
  try {
    await connection.beginTransaction();

    const [truckRows] = await connection.execute(
      'SELECT * FROM trucks WHERE truck_number = ?',
      [truck_number]
    );

    let truckId;
    if (truckRows.length === 0) {
      const [insertTruck] = await connection.execute(
        'INSERT INTO trucks (truck_number) VALUES (?)',
        [truck_number]
      );
      truckId = insertTruck.insertId;
    } else {
      truckId = truckRows[0].id;
    }

    const [entryResult] = await connection.execute(
      'INSERT INTO truck_entries (truck_id, total_weight) VALUES (?, ?)',
      [truckId, total_weight]
    );

    const entryId = entryResult.insertId;

    for (const waste of waste_distribution) {
      const [wasteType] = await connection.execute(
        'SELECT * FROM waste_types WHERE name = ?',
        [waste.type]
      );

      if (wasteType.length === 0) continue;

      await connection.execute(
        'INSERT INTO waste_distributions (truck_entry_id, waste_type_id, weight) VALUES (?, ?, ?)',
        [entryId, wasteType[0].id, waste.weight]
      );
    }

    await connection.commit();
    res.status(201).json({ message: 'Entry recorded successfully' });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    connection.release();
  }
}

export async function getDailySummary(req, res) {
  const { date } = req.query;

  try {
    const [summary] = await execute(
      `SELECT wt.name AS waste_type, SUM(wd.weight) AS total_weight
       FROM truck_entries te
       JOIN waste_distributions wd ON wd.truck_entry_id = te.id
       JOIN waste_types wt ON wt.id = wd.waste_type_id
       WHERE DATE(te.timestamp) = ?
       GROUP BY wt.name`,
      [date]
    );

    const [total] = await execute(
      `SELECT SUM(total_weight) AS daily_total
       FROM truck_entries
       WHERE DATE(timestamp) = ?`,
      [date]
    );

    res.json({
      date,
      total_weight: total[0].daily_total || 0,
      breakdown: summary,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getTruckHistory(req, res) {
  const { number } = req.params;

  try {
    const [history] = await execute(
      `SELECT te.id, te.total_weight, te.timestamp
       FROM trucks t
       JOIN truck_entries te ON te.truck_id = t.id
       WHERE t.truck_number = ?
       ORDER BY te.timestamp DESC`,
      [number]
    );

    res.json({ truck_number: number, entries: history });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function listTrucks(req, res) {
  try {
    const [trucks] = await execute('SELECT * FROM trucks');
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function listWasteTypes(req, res) {
  try {
    const [wasteTypes] = await execute('SELECT * FROM waste_types');
    res.json(wasteTypes);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteTruckEntry(req, res) {
  const { id } = req.params;
  const connection = await getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM waste_distributions WHERE truck_entry_id = ?', [id]);
    await connection.execute('DELETE FROM truck_entries WHERE id = ?', [id]);
    await connection.commit();
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    connection.release();
  }
}

export async function updateTruckEntry(req, res) {
  const { id } = req.params;
  const { total_weight, waste_distribution } = req.body;
  const connection = await getConnection();
  try {
    await connection.beginTransaction();
    if (total_weight !== undefined) {
      await connection.execute('UPDATE truck_entries SET total_weight = ? WHERE id = ?', [total_weight, id]);
    }
    if (Array.isArray(waste_distribution)) {
      await connection.execute('DELETE FROM waste_distributions WHERE truck_entry_id = ?', [id]);
      for (const waste of waste_distribution) {
        const [wasteType] = await connection.execute(
          'SELECT * FROM waste_types WHERE name = ?',
          [waste.type]
        );
        if (wasteType.length === 0) continue;
        await connection.execute(
          'INSERT INTO waste_distributions (truck_entry_id, waste_type_id, weight) VALUES (?, ?, ?)',
          [id, wasteType[0].id, waste.weight]
        );
      }
    }
    await connection.commit();
    res.json({ message: 'Entry updated successfully' });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    connection.release();
  }
}
