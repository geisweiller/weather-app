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
    <div className="relative">
      <input
        type="text"
        className="p-2 rounded-lg bg-dark-blue bg-opacity-50 container text-light-gray border-dark-blue border font-Montserrat placeholder:text-light-gray"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};
