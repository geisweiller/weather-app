import { useEffect, useRef, useState } from "react";
import { Text } from "../text/text";

interface SearchListResult {
  name: string;
  lat: number;
  lon: number;
}
interface SearchInputProps extends React.HTMLAttributes<HTMLInputElement> {
  /**
   * List of results to show for the query typed
   */
  list: SearchListResult[];
  /**
   * Query to search
   */
  query: string;
  /**
   * Placeholder for input
   */
  placeholder?: string;
  /**
   * Boolean that indicates if the result list is loading
   */
  isLoading?: boolean;
  /**
   * Set query value to search
   */
  setQuery: (query: string) => void;
  /**
   * Action to execute when a result is selected
   */
  onSelected: (result: SearchListResult) => void;
}

export const SearchInput = ({
  list,
  query,
  setQuery,
  onSelected,
  ...props
}: SearchInputProps) => {
  const [showList, setShowList] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length < 3) {
      setShowList(false);
      return;
    } else {
      setShowList(true);
    }
  }, [list, query]);

  return (
    <div className="relative" onBlur={() => setShowList(false)}>
      <input
        type="text"
        className="p-2 rounded-lg bg-white container text-black border-black border font-Montserrat placeholder:text-black"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowList(true)}
        {...props}
      />
      {showList && (
        <div className="absolute container bg-white rounded-lg z-10 mt-1 flex flex-col border-black border">
          {list.map((item) => (
            <button
              key={item.name}
              className="p-2 container flex items-start bg-white text-black hover:bg-dark-blue hover:text-white"
              onClick={() => {
                onSelected(item);
                setShowList(false);
                setQuery("");
              }}
            >
              <Text>{item.name}</Text>
            </button>
          ))}
          {!list.length && (
            <div className="p-2 container text-black">
              <Text>No results found</Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
