interface LoaderBlockProps {
  boardWidth: "w-1" | "w-2" | "w-3" | "w-4" | "w-5" | "w-6";
  boardHeight: "h-1" | "h-2" | "h-3" | "h-4" | "h-5" | "h-6";
  blocks: number;
  width: string;
  height: string;
  background: string;
}

export const LoaderBlocks = ({
  boardWidth = "w-4",
  boardHeight = "h-4",
  blocks = 9,
  width = "3px",
  height = "3px",
  background = "#555",
}: Partial<LoaderBlockProps>) => {
  return (
    <div className={`${boardWidth} ${boardHeight} grid grid-cols-3`}>
      {Array.from({ length: blocks }).map((_, i) => (
        <span
          key={i}
          id={`item-${i + 1}`}
          style={{ background, width, height }}
        ></span>
      ))}
    </div>
  );
};
