ALTER TABLE "public"."anime_reviews" 
ADD COLUMN "manga_id" INTEGER REFERENCES "public"."manga"(id); 