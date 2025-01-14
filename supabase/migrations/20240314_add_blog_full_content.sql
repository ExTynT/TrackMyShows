-- Add full_content column to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS full_content TEXT;

-- Update blog post with full content
UPDATE blog_posts 
SET full_content = '
<h2>The Best Anime of 2023: A Year in Review</h2>

<p>2023 has been an exceptional year for anime, with groundbreaking new series and stunning continuations of beloved franchises. Our team has carefully curated this list, considering animation quality, storytelling, character development, and overall impact on the medium.</p>

<h3>10. Zom 100: Bucket List of the Dead</h3>
<p>A fresh take on the zombie genre that combines humor with social commentary. The series offers a unique perspective on finding joy in life through its protagonist''s journey of self-discovery amidst a zombie apocalypse.</p>

<h3>9. Oshi no Ko</h3>
<p>A dark and compelling look into the entertainment industry, masterfully blending supernatural elements with realistic industry practices. The show''s unique premise and stunning animation by Doga Kobo made it one of the year''s most talked-about series.</p>

<h3>8. Vinland Saga Season 2</h3>
<p>MAPPA''s continuation of the historical epic brings a more contemplative tone, focusing on themes of peace and redemption. The character development in this season is particularly noteworthy.</p>

<h3>7. Demon Slayer: Swordsmith Village Arc</h3>
<p>Ufotable continues to set new standards in animation with this arc, featuring some of the most visually spectacular fights in anime history. The emotional depth of the story matches its visual excellence.</p>

<h3>6. Frieren: Beyond Journey''s End</h3>
<p>A beautifully contemplative series that explores life, death, and the passage of time through a unique fantasy lens. Its methodical pacing and gorgeous animation create a mesmerizing viewing experience.</p>

<h3>5. Chainsaw Man</h3>
<p>MAPPA''s adaptation of this unconventional shonen series brings incredible animation and style to match its wild premise. The series pushes boundaries in both storytelling and visual presentation.</p>

<h3>4. Jujutsu Kaisen Season 2</h3>
<p>The Shibuya Incident arc delivers some of the most intense and emotionally impactful episodes of the year. MAPPA''s animation reaches new heights in bringing Gege Akutami''s complex action sequences to life.</p>

<h3>3. Attack on Titan: The Final Season Part 2</h3>
<p>The epic conclusion to one of anime''s most influential series delivers on all fronts, with stunning animation and emotional payoffs to long-running storylines.</p>

<h3>2. Bocchi the Rock!</h3>
<p>This surprise hit combines incredible animation with heartfelt storytelling about anxiety and finding oneself through music. CloverWorks'' creative visual presentation elevates the material to new heights.</p>

<h3>1. One Piece</h3>
<p>The series reaches new heights this year with both the manga''s final saga beginning and the successful Netflix adaptation. The Gear 5 reveal and its animation became an instant classic moment in anime history.</p>

<h3>Honorable Mentions</h3>
<p>Series like Blue Lock, The Apothecary Diaries, and Spy x Family Season 2 just barely missed our top 10 but deserve recognition for their outstanding quality and entertainment value.</p>

<h3>Looking Forward to 2024</h3>
<p>With anticipated releases like Solo Leveling, Kaiju No. 8, and more, 2024 is shaping up to be another incredible year for anime fans worldwide.</p>
'
WHERE title = 'Top 10 Anime of 2023';

UPDATE blog_posts 
SET full_content = '
<h2>Attack on Titan Series Finale: A Masterpiece Conclusion</h2>

<p>After 10 years, Attack on Titan has finally reached its conclusion, delivering one of the most impactful and thought-provoking endings in anime history. This review will explore how the finale masterfully wraps up the complex narrative while staying true to the series'' core themes.</p>

<h3>Visual and Technical Achievement</h3>
<p>MAPPA''s animation team has outdone themselves with the finale, delivering breathtaking action sequences and emotional moments with equal precision. The use of CGI has been refined to near perfection, creating seamless integration with traditional animation that enhances rather than detracts from the viewing experience.</p>

<h3>Narrative Resolution</h3>
<p>The finale successfully addresses the major plot threads while maintaining the moral complexity that has made Attack on Titan stand out. The conclusion feels both inevitable and surprising, a difficult balance that few series manage to achieve.</p>

<h3>Character Arcs</h3>
<p>Every major character receives a satisfying conclusion to their personal journey. The emotional payoff for long-running character developments hits particularly hard, especially for Eren, Mikasa, and Armin. The way their relationships evolve and conclude feels true to their established characterizations while still surprising viewers.</p>

<h3>Thematic Depth</h3>
<p>The series'' exploration of cycles of violence, the cost of freedom, and the complexity of human nature reaches its peak in the finale. The conclusion challenges viewers to grapple with difficult questions while avoiding simple answers.</p>

<h3>Sound Design and Music</h3>
<p>The soundtrack and sound design deserve special mention, with both original compositions and callbacks to earlier themes perfectly underlining key moments. The voice acting across the cast delivers emotional performances that will stay with viewers long after the credits roll.</p>

<h3>Impact and Legacy</h3>
<p>Attack on Titan has redefined what''s possible in anime storytelling, and this finale cements its place as one of the medium''s greatest achievements. Its influence will be felt in the industry for years to come.</p>

<h3>Final Verdict</h3>
<p>A masterful conclusion that lives up to the series'' legacy. While some viewers may debate certain narrative choices, the technical execution, emotional impact, and thematic resonance are undeniable. Attack on Titan''s finale earns its place among the greatest endings in anime history.</p>

<div class="rating-breakdown">
<h4>Rating Breakdown:</h4>
<ul>
  <li>Animation Quality: 10/10</li>
  <li>Story Resolution: 9.5/10</li>
  <li>Character Development: 9.5/10</li>
  <li>Sound Design: 10/10</li>
  <li>Emotional Impact: 9.5/10</li>
  <li>Overall: 9.5/10</li>
</ul>
</div>
'
WHERE title = 'Attack on Titan Finale Review';

-- Make full_content NOT NULL after populating it
ALTER TABLE blog_posts 
ALTER COLUMN full_content SET NOT NULL; 