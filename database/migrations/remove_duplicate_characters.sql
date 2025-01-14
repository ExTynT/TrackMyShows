-- Najprv nájdeme duplicity
WITH duplicates AS (
  SELECT id, name, anime_id,
    ROW_NUMBER() OVER (PARTITION BY name, anime_id ORDER BY id) as row_num
  FROM characters
)
SELECT * FROM duplicates WHERE row_num > 1;

-- Odstránime duplicity (ponecháme len prvý výskyt každej postavy)
BEGIN;

DELETE FROM characters
WHERE id IN (
  SELECT id
  FROM (
    SELECT id,
      ROW_NUMBER() OVER (PARTITION BY name, anime_id ORDER BY id) as row_num
    FROM characters
  ) duplicates
  WHERE row_num > 1
);

COMMIT; 