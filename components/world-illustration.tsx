export type LearningWorld =
  "books" | "quiz" | "tree" | "space" | "battle" | "shop" | "nature";

export function WorldIllustration({
  world,
  className = "",
}: {
  world: LearningWorld;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`world-illustration world-${world} ${className}`}
    />
  );
}

const storyScenes: Record<string, string> = {
  "moon-rabbit": "rabbit",
  kindness: "kindness",
  "little-garden": "garden",
  "star-journey": "space",
  "magic-map": "map",
  "water-drop": "garden",
  "clever-fox": "fox",
  "book-friend": "kindness",
};

export function StoryIllustration({
  bookId,
  className = "",
}: {
  bookId: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`story-illustration scene-${storyScenes[bookId] ?? "rabbit"} ${className}`}
    />
  );
}
