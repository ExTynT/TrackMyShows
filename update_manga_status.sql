-- Update Chainsaw Man rating
UPDATE "public"."manga" 
SET rating = 4.8
WHERE id = 6;

-- Update status for upcoming manga
UPDATE "public"."manga"
SET status = 'hiatus'
WHERE id IN (7, 8, 9); 