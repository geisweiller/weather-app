import { MagnifyingGlass, XCircle } from "@phosphor-icons/react";
interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  /**
   * Query to search
   */
  query: string;
  /**
   * Set query value to search
   */
  setQuery: (query: string) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
}

export const Input = ({
  query,
  setQuery,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <div className="flex items-center bg-dark-blue bg-opacity-50 rounded-lg p-2 gap-2 ">
      <MagnifyingGlass size={32} color="white" />
      <input
        type="text"
        className="bg-transparent container text-light-gray border-transparent border font-Montserrat placeholder:text-light-gray"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
      {query && (
        <button type="button" onClick={() => setQuery("")}>
          <XCircle size={32} color="white" />
        </button>
      )}
    </div>
  );
};
