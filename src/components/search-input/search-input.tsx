import { useEffect, useRef, useState } from "react";
import { Text } from "../text/text";

interface SearchListResult {
  [key: string]: any;
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
  isLoading,
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
    <div className="relative">
      <input
        type="text"
        className="p-2 rounded-lg bg-white container text-black border-black border font-Montserrat placeholder:text-black"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (query.length > 3) setShowList(true);
        }}
        {...props}
      />
      {showList && (
        <div className="absolute container bg-white rounded-lg z-10 mt-1 flex flex-col border-black border">
          {list.map((item) => (
            <button
              key={item.lat + item.lon}
              className="p-2 container flex items-start bg-white text-black hover:bg-dark-blue hover:text-white hover:cursor-pointer gap-1"
              onClick={() => {
                onSelected(item);
                setShowList(false);
                setQuery("");
              }}
            >
              <Text>{item.name}</Text>
              {item.state && <Text>({item.state})</Text>}
            </button>
          ))}
          {!list.length && !isLoading && (
            <div className="p-2 container text-black">
              <Text>No results found</Text>
            </div>
          )}
          {isLoading && (
            <div className="p-2 container text-black">
              <Text>Loading...</Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
