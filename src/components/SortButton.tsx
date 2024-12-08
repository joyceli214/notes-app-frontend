interface SortButtonProps {
  sortOption: string;
  onSortChange: (option: string) => void;
}

export default function SortButton({
  sortOption,
  onSortChange,
}: SortButtonProps) {
  return (
    <div className="mb-4">
      <label htmlFor="sort" className="mr-2">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="date-asc">Date (Oldest to Newest)</option>
        <option value="date-desc">Date (Newest to Oldest)</option>
      </select>
    </div>
  );
}
