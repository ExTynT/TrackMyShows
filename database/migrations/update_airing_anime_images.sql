BEGIN;

UPDATE anime 
SET image_url = 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/sign/Images/ANIME/DS.avif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQU5JTUUvRFMuYXZpZiIsImlhdCI6MTczNjg2NDk2MywiZXhwIjoxNzY4NDAwOTYzfQ.H7RKAOjXKq5Q_-z15GjzgGvtufcxO2IFYwoJjELifkE&t=2025-01-14T14%3A29%3A23.359Z'
WHERE title = 'Demon Slayer: Kimetsu no Yaiba';

UPDATE anime 
SET image_url = 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/sign/Images/ANIME/JJK.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQU5JTUUvSkpLLndlYnAiLCJpYXQiOjE3MzY4NjQ5NzgsImV4cCI6MTc2ODQwMDk3OH0.D4n4nAbYEVjXczsanKOhIxnt-tneZh-Vbbc5Jn3SQUc&t=2025-01-14T14%3A29%3A37.857Z'
WHERE title = 'Jujutsu Kaisen';

UPDATE anime 
SET image_url = 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/sign/Images/ANIME/OP.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQU5JTUUvT1Aud2VicCIsImlhdCI6MTczNjg2NDk5MywiZXhwIjoxNzY4NDAwOTkzfQ.bmCWGP0594Mk_BdqmVArZdVUy-RcpZSmvDxR-plkFAU&t=2025-01-14T14%3A29%3A53.506Z'
WHERE title = 'One Piece';

UPDATE anime 
SET image_url = 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/sign/Images/ANIME/MHA.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQU5JTUUvTUhBLmpwZyIsImlhdCI6MTczNjg2NTAwNSwiZXhwIjoxNzY4NDAxMDA1fQ.mtNWBBIJHTIkSMtxpGqBRqSfPAUhURuGbPYCpNWdEJY&t=2025-01-14T14%3A30%3A04.816Z'
WHERE title = 'My Hero Academia';

COMMIT; 